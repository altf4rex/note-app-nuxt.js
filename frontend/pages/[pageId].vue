<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pageId = route.params.pageId;
const page = ref({ title: "", content: "" });
const isLoading = ref(true);
const errorMessage = ref("");

async function loadPage() {
  isLoading.value = true;
  try {
    if (!pageId) throw new Error("Page ID is missing");
    const newPage = await $fetch(
      `${import.meta.env.VITE_API_URL}/api/pages/${pageId}`
    );
    page.value = newPage;
  } catch (error) {
    errorMessage.value = "Failed to load the page.";
    console.error("Error fetching page:", error);
  } finally {
    isLoading.value = false;
  }
}

const savePage = async () => {
  try {
    await $fetch(`${import.meta.env.VITE_API_URL}/api/pages/${pageId}`, {
      method: "PUT",
      body: page.value,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving page:", error);
  }
};

onMounted(() => {
  loadPage();
});
</script>

<template>
  <div class="container">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <div v-else>
      <input v-model="page.title" placeholder="Title" class="title" />
      <textarea
        v-model="page.content"
        placeholder="Content"
        class="content"
      ></textarea>
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
