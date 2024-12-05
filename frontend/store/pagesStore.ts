import { defineStore } from 'pinia';
import { fetchPages, addPage, deletePage } from '@/utils/apiService';
import type { ListType } from '../types/index';

export const usePagesStore = defineStore("pages", {
    state: () => ({
      list: [] as ListType[],
    }),
    actions: {
      async fetchPages() {
        const pages = await fetchPages();
        this.list = pages;
      },
      async addPage(title: string, content: string) {
        const newPage = await addPage({ title, content });
        this.list.push(newPage);
      },
      async deletePage(id: string) {
        await deletePage(id);
        this.list = this.list.filter((page) => page._id !== id);
      },
    },
  });

