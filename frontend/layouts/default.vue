<template>
  <div class="main-container" :class="{ 'sidebar-open': uiStore.isSidebarOpen }">
    <Sidebar />
    <div class="main-page">
      <Header />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePagesStore } from "@/store/pagesStore";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";

import Sidebar from "~/components/Sidebar.vue";
import Header from "~/components/Header.vue";

// Инициализация хранилищ
const pagesStore = usePagesStore();
const authStore = useAuthStore();
const uiStore = useUiStore();

// Подписка на изменения состояния AuthStore
authStore.$subscribe((mutation, state) => {
  if (!state.currentUser) {
    pagesStore.clearPages(); // Очистить страницы, если пользователь вышел
  }
});

// Логика при монтировании компонента
onMounted(async () => {
  try {
    authStore.loadCurrentUser();
    await pagesStore.fetchPages();
  } catch (error: any) {
    console.error("Failed to initialize data:", error.message);
  }
});
</script>

<style scoped>
.main-container {
  display: flex;
  width: 100%;
  height: 100%;
  transition: margin-left 0.3s ease; /* Плавное изменение ширины */
}

.sidebar-open .main-page {
  margin-left: 250px; /* Ширина открытого Sidebar */
}

.main-page {
  flex: 1;
  transition: margin-left 0.3s ease; /* Плавное сдвижение */
}
</style>
