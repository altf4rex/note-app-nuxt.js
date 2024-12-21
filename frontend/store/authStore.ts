import { defineStore } from 'pinia'; 
import { fetchCurrentUser, logoutUser } from '../utils/apiService';
import { usePagesStore } from './pagesStore';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    currentUser: null,
  }),
  
  actions: {
    async logout() {
      const pagesStore = usePagesStore();
      try {
        // Вызываем API logout
        await logoutUser();
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        // Очищаем локальное состояние
        this.isAuthenticated = false;
        this.currentUser = null;
        pagesStore.clearPages();
        this.$reset();
      }
    },

    async loadCurrentUser() {
      try {
        // Запрашиваем данные текущего пользователя с сервера
        this.currentUser = await fetchCurrentUser();
        this.isAuthenticated = !!this.currentUser; // true, если пользователь есть
      } catch (error) {
        console.error('Error loading current user:', error);
        this.isAuthenticated = false;
        this.currentUser = null;
      }
    },
  },
});


