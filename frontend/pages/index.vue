<script setup lang="ts">
import { usePagesStore } from "@/store/pagesStore";
import { useRouter } from "vue-router";
import PageItem from "~/components/PageItem.vue";

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
    <PageItem v-if="pagesStore.list.length > 0"/>
    <div class="empty-message" v-else>
      <p>No pages found. Why not create one?</p>
      <button @click="addPage">Add Page</button>
    </div>
  </div>
</template>


<style scoped>
.mainPage-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.empty-message {
  text-align: center;
  color: #b2b2b1;
}

.empty-message button {
  margin-top: 10px;
  padding: 10px 20px;
  color: #fff;
  background-color: #444;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.empty-message button:hover {
  background-color: #555;
}
</style>
