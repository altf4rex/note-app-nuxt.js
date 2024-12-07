<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePagesStore } from '@/store/pagesStore';

const router = useRouter();
const pagesStore = usePagesStore();

// Загрузка страниц при монтировании
onMounted(async () => {
  try {
    await pagesStore.fetchPages();
  } catch (error: any) {
    console.error("Failed to fetch pages:", error.message);
  }
});

// Добавление новой страницы
const addPage = async () => {
  try {
    const newPageId = await pagesStore.addPage("New Page", "Text");
    router.push(`/${pagesStore.currentPage._id}`);
  } catch (error: any) {
    console.error("Failed to add page:", error.message);
  }
};

// Удаление страницы
const deletePage = async (id: string) => {
  try {
    await pagesStore.deletePage(id);
  } catch (error: any) {
    console.error("Failed to delete page:", error.message);
  }
};
</script>

<template>
  <div class="sideBar-container" v-if="pagesStore.list.length > 0">
    <p>
      <router-link :to="`/`">Welcome Page</router-link>
    </p>
    <ul class="list">
      <li class="list-item" v-for="(page, index) in pagesStore.list" :key="page._id">
        <router-link :to="`/${page._id}`">{{ page.title }}</router-link>
        <button @click="deletePage(page._id)">
          delete
        </button>
      </li>
    </ul>
    <button @click="addPage">Add Page</button>
  </div>
  <div v-else>Hmmm... Pages...</div>
</template>

<style scoped>
.sideBar-container {
  min-width: 30%;
  height: 100%;
  background: #262323;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  margin: 10px 0;
  font-family: Arial, sans-serif;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.list-item a {
  text-decoration: none;
  color: #b2b2b1;
  transition: color 0.3s ease;
}

.list-item a:hover {
  color: #ffffff;
}

.list-item button {
  color: blanchedalmond;
  background-color: inherit;
  border: 1px solid blanchedalmond;
  border-radius: 12px;
}

.list-item button:hover {
  background-color: gray;
}
</style>
