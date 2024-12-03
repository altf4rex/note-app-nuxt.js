<script setup>
import { ref, onMounted } from 'vue';
import { fetchAllPages, createPage } from '../services/pageService';
import { useRouter } from 'vue-router';

const allPagesResponse = ref([]);
const router = useRouter();

onMounted(async () => {
    await loadPages();
});

async function loadPages() {
    try {
        allPagesResponse.value = await fetchAllPages(); // Перезагружаем список страниц
    } catch (error) {
        console.error('Error fetching pages:', error);
    }
}

const handleCreatePage = async () => {
    try {
        const newPage = await createPage();
        await loadPages(); // Обновляем список страниц
        router.push(`/${newPage.id}`); // Переходим на страницу редактирования
    } catch (error) {
        console.error('Error creating page:', error);
    }
};
</script>


<template>
    <div class="sideBar-container">
        <button @click="handleCreatePage">Add Page</button>
        <ul class="list">
            <li class="list-item" v-for="item in allPagesResponse" :key="item.id">
                <router-link :to="`/${item.id}`">{{ item.title }}</router-link>
            </li>
        </ul>
    </div>
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
