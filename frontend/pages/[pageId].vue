<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePagesStore } from "@/store/pagesStore";
import { useRoute } from "vue-router";
import TiptapEditor from "~/components/TiptapEditor.vue";

const route = useRoute();
const pageId = route.params.pageId as string;

const pagesStore = usePagesStore();

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

const updateContent = (newContent: string) => {
  pagesStore.currentPage.content = newContent;
};

const savePage = async () => {
  try {
    await pagesStore.savePage(pageId, pagesStore.currentPage);
    alert("Page saved successfully!");
  } catch (error) {
    alert("Failed to save the page.");
  }
};
</script>



<template>
  <div class="page-container">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <div v-else class="content">
      <input
        v-model="pagesStore.currentPage.title"
        placeholder="Title"
        class="title" />
      <client-only>
        <TiptapEditor />
      </client-only>
      <button class="save-page-button" @click="savePage">Save</button>
    </div>
  </div>
</template>


<style scoped>
.page-container {
  display: flex;
  flex-wrap: wrap;
  color: #b2b2b1;
}

.title {
  width: 100%;
  margin-top: 40px;
  margin-left: 10px;
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

.save-page-button {
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

.save-page-button:hover {
  background-color: #444;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}
</style>