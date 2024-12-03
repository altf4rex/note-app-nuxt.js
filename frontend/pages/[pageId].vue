<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageId = route.params.pageId;
const page = ref({ title: '', content: '' });

onMounted(async () => {
    await loadPage();
});

async function loadPage() {
    const response = await fetch(`/api/pages/${pageId}`);
    if (!response.ok) {
        console.error('Error fetching page');
        return;
    }
    page.value = await response.json();
}

const savePage = async () => {
    const response = await fetch(`/api/pages/${pageId}`, {
        method: 'PUT',
        body: JSON.stringify(page.value),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
        console.error('Error saving page');
    } else {
        await loadPages(); // Обновляем список страниц
    }
};
</script>


<template>
    <div class="container">
        <input v-model="page.title" placeholder="Title" class="title"/>
        <textarea v-model="page.content" placeholder="Content" class="content"></textarea>
        <button @click="savePage">Save</button>
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
    color: #B2B2B1;
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
    font-family: 'IndieFlower', sans-serif;
    color: #B2B2B1;
    
}

.title {
    flex: 0; 
}

.content {
    flex: 3; 
}

</style>
