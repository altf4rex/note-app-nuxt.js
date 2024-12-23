<script setup lang="ts">

import { useUiStore } from '@/store/uiStore';
const uiStore = useUiStore();


</script>

<template>
  <header>
    <button class="sideBar-burger" @click="uiStore.toggleSidebar">
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M4 18L20 18"
          stroke="#FFF"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M4 12L20 12"
          stroke="#FFF"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M4 6L20 6"
          stroke="#FFF"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <Authorization />
  </header>
</template>



<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 10px 4px;
}

.sideBar-burger {
  background: transparent; 
  border: none; 
  padding: 0; 
  cursor: pointer; 
  display: flex;
  align-items: center; 
  justify-content: center;
}

.sideBar-burger svg {
  width: 30px; 
  height: 30px; 
  fill: white; 
  stroke: white; 
  stroke-width: 2; 
}

.sideBar-burger svg:hover {
  stroke: #ccc; 
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center; 
}

</style>
