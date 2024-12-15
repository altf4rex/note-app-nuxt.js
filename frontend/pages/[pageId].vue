<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePagesStore } from "@/store/pagesStore";
import { useAuthStore } from "@/store/authStore"; // Добавляем store для авторизации
import { useRoute } from "vue-router";

const route = useRoute();
const pageId = route.params.pageId as string;

const pagesStore = usePagesStore();
const authStore = useAuthStore(); // Для проверки авторизации

const isLoading = ref(true);
const errorMessage = ref("");

onMounted(async () => {
  try {
    await pagesStore.fetchPageById(pageId);
    isLoading.value = false;
  } catch (error: any) {
    errorMessage.value = error.message;
    isLoading.value = false;
  }
});

const savePage = async () => {
  // Проверяем авторизацию перед сохранением
  // if (!authStore?.currentUser?.username) {
  //   alert("You must be logged in to save the page.");
  //   return;
  // }

  try {
    await pagesStore.savePage(pageId, pagesStore.currentPage);
    alert("Page saved successfully!");
  } catch (error) {
    alert("Failed to save the page.");
  }
};
</script>

<template>
  <div class="container">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <div v-else>
      <input v-model="pagesStore.currentPage.title" placeholder="Title" class="title" />
      <textarea v-model="pagesStore.currentPage.content" placeholder="Content" class="content"></textarea>
      <button @click="savePage">Save</button>
    </div>
  </div>
</template>


<style scoped>
.container {
  min-width: 67%;
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: #b2b2b1;
}

.title,
.content {
  width: 100%;
  height: 100%;
  font-size: 36px;
  background-color: transparent;
  border: none;
  resize: none;
  overflow: hidden;
  font-family: "IndieFlower", sans-serif;
  color: #b2b2b1;
}

.title {
  flex: 0;
}

.content {
  flex: 3;
}
</style>