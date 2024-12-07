<script setup lang="ts">
import { onMounted } from "vue";
import { usePagesStore } from "@/store/pagesStore";
import { useRouter } from "vue-router";

const router = useRouter();

function navigateToPage(id: string) {
  router.push(`/${id}`);
}

function addNewPage() {
  router.push("/new");
}

const pagesStore = usePagesStore();

onMounted(async () => {
  try {
    await pagesStore.fetchPages();
  } catch (error: any) {
    console.error("Failed to fetch pages:", error.message);
  }
});

</script>

<template>
  <div class="container">
    <template v-if="pagesStore.list.length > 0">
      <div
        class="page-sticker"
        v-for="item in pagesStore.list"
        :key="item._id"
        @click="navigateToPage(item._id)"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
      </div>
    </template>
    <div class="empty-message" v-else>
      <p>No pages found. Why not create one?</p>
      <button @click="addNewPage">Add Page</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.page-sticker {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #2b2b2b;
  border: 1px solid #444;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.page-sticker:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.page-sticker h3 {
  margin: 0 0 10px;
  color: #fff;
}

.page-sticker p {
  margin: 0;
  color: #b2b2b1;
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
