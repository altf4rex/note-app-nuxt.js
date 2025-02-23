<script setup lang="ts">
import { usePagesStore } from "@/store/pagesStore";
import { useRouter } from "vue-router";
import PageItem from "~/components/PageItem.vue";
import SkeletonCards from "~/components/SkeletonCard.vue";

const router = useRouter();
const pagesStore = usePagesStore();

function navigateToPage(id: string) {
  router.push(`/${id}`);
}

const addPage = async () => {
  try {
    await pagesStore.addPage("New Page", "Text");
    router.push(`/${pagesStore.currentPage._id}`);
  } catch (error: any) {
    console.error("Failed to add page:", error.message);
  }
};
</script>

<template>
  <div class="mainPage-container">
    <!-- Отображаем скелетоны, если идет загрузка -->
    <SkeletonCards v-if="pagesStore.isLoading" v-for="i in 8" :key="i" />
    <!-- Отображаем карточки, если данные загружены -->
    <div v-else>
      <div v-if="pagesStore.list.length > 0">
        <PageItem />
      </div>

      <!-- Сообщение, если страниц нет -->
      <div class="empty-message" v-else>
        <p>No pages found. Why not create one?</p>
        <button @click="addPage">Add Page</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.mainPage-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  gap: 20px;
  padding: 20px;
}

.empty-message {
  text-align: center;
  color: #b2b2b1;
}

.empty-message button {
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

.empty-message button:hover {
  background-color: #444;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}
</style>
