<template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>



<style>
/* Глобальные стили */
@font-face {
  font-family: 'IndieFlower';
  src: url('public/fonts/IndieFlower-Regular.ttf') format('truetype');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: auto;
  scrollbar-color: #434243;
}

*::-webkit-scrollbar {
  width: 6px;
}

*::-webkit-scrollbar-track {
  background: #272727;
}

*::-webkit-scrollbar-thumb {
  background-color: #434243;
  border-radius: 18px;
}

::selection {
  background: #434243; 
  color: #B2B2B1;
}
::-moz-selection {
  background: #434243; 
  color: #B2B2B1;
}
::-webkit-selection {
  background: #434243; 
  color: #B2B2B1;
}

body {
  font-family: 'IndieFlower', sans-serif;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh; 
  background-color: #1d1d1d;
  color: #B2B2B1; 
  overflow-x: hidden;
}

input:active, :hover, :focus {
    outline: 0;
    outline-offset: 0;
}
/* #__nuxt{
  width: 100%;
  height: 100%; 
} */
</style>
