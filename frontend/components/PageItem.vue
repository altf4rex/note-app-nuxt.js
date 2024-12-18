<script setup lang="ts">
import { usePagesStore } from "@/store/pagesStore";
import { useRouter } from "vue-router";

const router = useRouter();
const pagesStore = usePagesStore();

function navigateToPage(id: string) {
  router.push(`/${id}`);
}
</script>

<template>
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

<style scoped>
.page-sticker {
    padding: 20px;
    display: flex;
    width: 300px;
    flex-direction: column;
    align-items: center;
    background-color: #2b2b2b;
    border: 1px solid #444;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

</style>