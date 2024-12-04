<script setup lang="ts">
import { ref, onMounted } from "vue";

const response = ref<any>(null);

const fetchPages = async () => {
  try {
    response.value = await $fetch(`${import.meta.env.VITE_API_URL}/api/pages`);
  } catch (error) {
    console.error('Error fetching pages:', error);
  }
};



onMounted(() => {
  fetchPages();
});
</script>

<template>
  <div class="container">
    <p class="text">My name is Gustavo</p>
    <div v-if="response">{{ response[0].title }}</div>
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped>
.container {
  min-width: 67%;
  min-height: 100%;
}
.text {
  color: #B2B2B1;
}
</style>
