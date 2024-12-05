<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePagesStore } from '@/store/pagesStore';

const router = useRouter();
const pagesStore = usePagesStore();

onMounted(() => {
    pagesStore.fetchPages();
});

const addPage = () => {
  pagesStore.addPage('New Page', 'Content');
  router.push(pagesStore.list[pagesStore.list.length - 1]._id);
};

const deletePage = (id: string) => {
  pagesStore.deletePage(id);
};
</script>

<template>
  <div class="sideBar-container" v-if="pagesStore.list.length > 0">
    <ul class="list">
      <li class="list-item" v-for="(page, index) in pagesStore.list" :key="page._id">
        <router-link :to="`/${page._id}`">{{ page.title }}</router-link>
        <button v-if="index !== 0" @click="deletePage(page._id)">
          delete
        </button>
      </li>
    </ul>
    <button @click="addPage">Add Page</button>
  </div>
  <div v-else>Loading...</div>
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
