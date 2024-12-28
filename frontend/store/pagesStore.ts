import { defineStore } from "pinia";
import { fetchPages, fetchPageById, addPage, savePage, deletePage, fetchShowCasePageById, fetchShowCasePages } from "../utils/apiService";
import { useAuthStore } from "./authStore";
import type { ListType } from "@/types/index";

export const usePagesStore = defineStore("pages", {
  state: () => ({
    list: [] as ListType[],
    currentPage: {} as ListType,
    error: null as string | null,
    isLoading: false,
  }),

  actions: {
    handleError(error: any) {
      this.error = error.message || "An error occurred";
      console.error("Error in store:", error);
    },

    updateListItem(id: string, updatedData: Partial<ListType>) {
      const index = this.list.findIndex((page) => page._id === id);
      if (index !== -1) {
        this.list[index] = { ...this.list[index], ...updatedData };
      }
    },

    async fetchPages() {
      this.isLoading = true;
      try {
        this.list = await fetchPages();
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
        console.log(this.list);
      }
    },

    async fetchPageById(id: string) {
      const cachedPage = this.list.find((page) => page._id === id);
      if (cachedPage) {
        this.currentPage = cachedPage;
        return;
      }

      this.isLoading = true;
      try {
        const fetchedPage = await fetchPageById(id);
        this.currentPage = fetchedPage || {
          _id: "",
          title: "",
          content: "",
          createdAt: new Date(),
          updatedAt: null,
        };
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    // Для шоукейсинга - получение всех страниц
    async fetchShowCasePages() {
      this.isLoading = true;
      try {
        this.list = await fetchShowCasePages();
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    // Для шоукейсинга - получение страницы по ID
    async fetchShowCasePageById(id: string) {
      const cachedPage = this.list.find((page) => page._id === id);
      if (cachedPage) {
        this.currentPage = cachedPage;
        return;
      }

      this.isLoading = true;
      try {
        const fetchedPage = await fetchShowCasePageById(id);
        this.currentPage = fetchedPage || {
          _id: "",
          title: "",
          content: "",
          createdAt: new Date(),
          updatedAt: null,
        };
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    async addPage(title: string, content: string) {
      this.isLoading = true;
      try {
        const newPage = await addPage({ title, content });
        this.list.push(newPage);
        this.currentPage = newPage;
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    async savePage(id: string, pageData: ListType) {
      this.isLoading = true;
      try {
        await savePage(id, pageData);
        this.updateListItem(id, pageData); // Обновляем список
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    async deletePage(id: string) {
      this.isLoading = true;
      try {
        await deletePage(id);
        this.list = this.list.filter((page) => page._id !== id);
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    clearPages() {
      this.list = [];
      this.currentPage = {} as ListType;
    },
  },
});


export function setupPagesStoreSubscriptions() {
  const pagesStore = usePagesStore();
  const authStore = useAuthStore();

  authStore.$subscribe((mutation, state) => {
    if (!state.currentUser) {
      pagesStore.clearPages(); // Очистить страницы, если пользователь вышел
    }
  });
}