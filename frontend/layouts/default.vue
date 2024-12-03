<script setup>

import Sidebar from "~/components/Sidebar.vue";
</script>

<template>
    <div class="main-container">
        <Sidebar /> 
        <slot /> 

    </div>
</template>


<style scoped>

    .main-container {
        display: flex;
        width: 100%;
        height: 100%; 
    }

</style>