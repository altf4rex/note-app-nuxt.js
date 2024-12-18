<script setup lang="ts">
import { onMounted } from "vue";
import { usePagesStore } from "@/store/pagesStore";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "~/components/Sidebar.vue";
import Header from "~/components/Header.vue";

// Инициализация хранилищ
const pagesStore = usePagesStore();
const authStore = useAuthStore();

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

<template>
  <div class="main-container">
    <Sidebar />
    <div class="main-page">
      <Header />
      <slot />
    </div>
    
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.main-page{
  width: 100%;
}


</style>
