import { defineStore } from "pinia";
import {
  fetchPages,
  fetchPageById,
  addPage,
  savePage,
  deletePage,
} from "@/utils/apiService";
import type { ListType } from "../types/index";

export const usePagesStore = defineStore("pages", {
  state: () => ({
    list: [] as ListType[],
    currentPage: {} as ListType,
    error: null as string | null,
    isLoading: false,
  }),

  actions: {

    handleError(error: any) {
      this.error = error.message || "Произошла ошибка";
      console.error("Ошибка в store:", error);
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
        const pages = await fetchPages();
        this.list = pages;
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchPageById(id: string) {
      this.isLoading = true;
      try {
        const page = await fetchPageById(id);
        this.currentPage = page;
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
        this.currentPage = newPage;
        this.list.push(newPage);
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
        this.updateListItem(id, pageData);
        this.error = null;
      } catch (error) {
        this.handleError(error);
        throw error; 
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
  },
});
