<script setup lang="ts">
import { usePagesStore } from '@/store/pagesStore';
import { useUiStore } from '@/store/uiStore';
import { useRouter } from "vue-router";

const pagesStore = usePagesStore();
const uiStore = useUiStore();
const router = useRouter();

const addPage = async () => {
  try {
    const newPageId = await pagesStore.addPage("New Page", "Text");
    router.push(`/${pagesStore.currentPage._id}`);
  } catch (error: any) {
    console.error("Failed to add page:", error.message);
  }
};

const deletePage = async (id: string) => {
  try {
    await pagesStore.deletePage(id);
  } catch (error: any) {
    console.error("Failed to delete page:", error.message);
  }
};
</script>

<template>
  <transition name="slide">
    <div v-if="uiStore.isSidebarOpen" class="sideBar-container">
      <h3 class="main-page__link">
        <router-link :to="`/`">Welcome Page</router-link>
      </h3>
      <ul class="list" v-if="pagesStore.list.length > 0">
        <li class="list-item" v-for="(page, index) in pagesStore.list" :key="page._id">
          <router-link :to="`/${page._id}`" class="list-item-link">
            <i class="icon-placeholder"></i> <!-- Иконка перед названием -->
            {{ page.title }}
          </router-link>
          <button class="delete-button" @click="deletePage(page._id)">✕</button>
        </li>
      </ul>
      <div v-else class="empty-pages">Hmmm... Pages...</div>
      <button class="add-page-button" @click="addPage">+ Add Page</button>
    </div>
  </transition>
</template>

<style scoped>
.sideBar-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 200px; /* Сохранена ширина */
  height: 100vh;
    background-color: #191919; /* Темный фон */
  color: #b2b2b1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-right: 1px solid #333;
  overflow: hidden;
  z-index: 100;
  transition: transform 0.3s ease;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.main-page__link a {
  text-decoration: none;
  color: #b2b2b1;
  font-size: 14px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-item-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #b2b2b1;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}

.list-item-link:hover {
  background-color: #2a2a2a;
  color: #fff;
}

.icon-placeholder {
  width: 16px;
  height: 16px;
  background-color: #444;
  border-radius: 4px;
}

.delete-button {
  border: none;
  background: none;
  color: #888;
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s, background-color 0.2s;
  border-radius: 4px;
}

.delete-button:hover {
  color: #fff;
  background-color: #444;
}

.add-page-button {
  background-color: #2a2a2a;
  color: #fff;
  font-size: 14px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.add-page-button:hover {
  background-color: #444;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}
</style>
