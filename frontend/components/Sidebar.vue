<script setup lang="ts">
    import { ref, onMounted } from "vue"
    import { useRouter } from "vue-router";

    interface ListType {
        id: string;
        title: string;
        content: number;
    }

    const list = ref<ListType[]>([])
    const router = useRouter();

    async function fetchListPages(): Promise<void>{
        try{
            list.value = await $fetch(`${import.meta.env.VITE_API_URL}/api/pages`)
        } catch (error){
            console.error('Error fetching pages:', error);
        }
    }

    async function addPage(): Promise<void>{
        try{
           const newPage = await $fetch<ListType>(`${import.meta.env.VITE_API_URL}/api/pages`, {
            method: "POST",
            body: JSON.stringify({
                title: "New Page",
                content: "This is a new page",
            }), 
            headers: {
                "Content-Type": "application/json",
            },
           })
           list.value.push(newPage);
           router.push(`/${newPage.id}`);
        } catch (error){
            console.error("Error creating page:", error);
        }
    }

    onMounted(() => {
        fetchListPages();
    });
</script>


<template>
    <div class="sideBar-container" v-if="list.length > 0">
      <ul class="list">
        <li class="list-item" v-for="page in list" :key="page.id">
          <router-link :to="`/${page.id}`">{{ page.title }}</router-link>
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
    list-style: none; /* Убираем маркеры списка */
    padding: 0; /* Убираем отступы */
    margin: 0;
}

.list-item {
    margin: 10px 0;
    font-family: Arial, sans-serif;
    font-size: 18px;
}

.list-item a {
    text-decoration: none;
    color: #B2B2B1;
    transition: color 0.3s ease;
}

.list-item a:hover {
    color: #FFFFFF;
}

</style>
