<script lang="ts" setup>
    const route = useRoute();
    const pageId = route.params.pageId; 
</script>

<template >
    <div class="container">
        <p class="text">
            {{pageId}}
        </p>
    </div>
</template>



<style scoped>
    /* :root {
    --primary-color: #333;
  } 
  color: var(--primary-color); 
  */

  .container {
    min-width: 67%;
    min-height: 100%;
  }

  .text {
    color: #B2B2B1;
  }
</style>