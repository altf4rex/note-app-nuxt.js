<script setup lang="ts">
import { usePagesStore } from '@/store/pagesStore';
import { useUiStore } from '@/store/uiStore';
import { useRouter } from "vue-router";

const pagesStore = usePagesStore();
const uiStore = useUiStore();
const router = useRouter();

const addPage = async () => {
  try {
    await pagesStore.addPage("New Page", "Text");
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
      <!-- Отображение контента при загрузке, пустом списке или наличии страниц -->
      <div v-if="pagesStore.isLoading" class="loading-placeholder">Loading...</div>
      <ul class="list" v-else-if="pagesStore.list.length > 0">
        <li class="list-item" v-for="(page, index) in pagesStore.list" :key="page._id">
          <router-link :to="`/${page._id}`" class="list-item-link">
            <svg x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50" class="pgae-icon">
              <path d="..."></path>
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
  width: 200px;
  height: 100vh;
  background-color: #191919;
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
.loading-placeholder {
  text-align: center;
  font-size: 18px;
  color: #ccc;
  margin-top: 20px;
}

.empty-pages {
  text-align: center;
  font-size: 16px;
  color: #bbb;
  margin-top: 20px;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
