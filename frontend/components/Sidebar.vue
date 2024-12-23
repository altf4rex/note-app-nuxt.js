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
            <svg x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50" class="pgae-icon">
              <path d="M 11.5 2 C 9.5788117 2 8 3.5788117 8 5.5 L 8 44.5 C 8 46.421188 9.5788117 48 11.5 48 L 38.5 48 C 40.421188 48 42 46.421188 42 44.5 L 42 14.585938 L 29.414062 2 L 11.5 2 z M 11.5 4 L 28 4 L 28 12.5 C 28 14.421188 29.578812 16 31.5 16 L 40 16 L 40 44.5 C 40 45.340812 39.340812 46 38.5 46 L 11.5 46 C 10.659188 46 10 45.340812 10 44.5 L 10 5.5 C 10 4.6591883 10.659188 4 11.5 4 z M 30 5.4140625 L 38.585938 14 L 31.5 14 C 30.659188 14 30 13.340812 30 12.5 L 30 5.4140625 z M 18.5 24.5 A 1.5 1.5 0 0 0 17 26 A 1.5 1.5 0 0 0 18.5 27.5 A 1.5 1.5 0 0 0 20 26 A 1.5 1.5 0 0 0 18.5 24.5 z M 22 25 L 22 27 L 33 27 L 33 25 L 22 25 z M 18.5 29.5 A 1.5 1.5 0 0 0 17 31 A 1.5 1.5 0 0 0 18.5 32.5 A 1.5 1.5 0 0 0 20 31 A 1.5 1.5 0 0 0 18.5 29.5 z M 22 30 L 22 32 L 33 32 L 33 30 L 22 30 z M 18.5 34.5 A 1.5 1.5 0 0 0 17 36 A 1.5 1.5 0 0 0 18.5 37.5 A 1.5 1.5 0 0 0 20 36 A 1.5 1.5 0 0 0 18.5 34.5 z M 22 35 L 22 37 L 33 37 L 33 35 L 22 35 z"></path>
          </svg>
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

.pgae-icon{
  
  width: 18px;
  height: 18px;
  fill: #b2b2b1;
  border-radius: 4px;
}

.list-item-link {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #b2b2b1;
  font-size: 14px;
  padding: 4px 2px;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}

.list-item-link:hover {
  background-color: #2a2a2a;
  color: #fff;
}



.delete-button {
  border: none;
  background: none;
  color: #888;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 6px;
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
