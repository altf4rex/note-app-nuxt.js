<script setup lang="ts">
import { usePagesStore } from "@/store/pagesStore";
import { useRouter } from "vue-router";

const router = useRouter();
const pagesStore = usePagesStore();

function navigateToPage(id: string) {
  router.push(`/${id}`);
}

const truncateText = (text: string, length: number): string => {
  const parser = new DOMParser();
  const parsedText = parser.parseFromString(text, "text/html").body.innerText;
  return parsedText.length > length ? parsedText.slice(0, length) + "..." : parsedText;
};
</script>

<template>
  <div class="container">
    <div
      class="page-sticker"
      v-for="item in pagesStore.list"
      :key="item._id"
      @click="navigateToPage(item._id)"
    >
      <h3>{{ item.title }}</h3>
      <client-only fallback="<p>Loading...</p>">
        <div class="page-sticker__content">
          <p>{{ truncateText(item.content, 300) }}</p>
        </div>
      </client-only>
    </div>
  </div>
</template>


<style scoped>
/* Контейнер для карточек */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  padding: 20px;
}

/* Стили карточек */
.page-sticker {
  padding: 20px;
  display: flex;
  width: 240px;
  height: 340px;
  flex-direction: column;
  align-items: center;
  background: #2b2b2b;
  border: 1px solid #444;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  overflow: hidden;
  position: relative;
}

.page-sticker:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

/* Стили заголовка */
.page-sticker h3 {
  margin: 0 0 10px;
  color: #ffffff;
  font-size: 18px;
  text-align: center;
}

/* Стили контента карточки */
.page-sticker__content {
  margin: 0;
  font-size: 14px;
  color: #b2b2b1;
  width: 100%;
  height: 100%;
  line-height: 1.6;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  background: repeating-linear-gradient(
    to bottom,
    #2b2b2b 0,
    #2b2b2b 22px,
    #3c3c3c 23px
  ); /* Линии, имитирующие страницы */
  padding: 10px;
  border-radius: 6px;
}

.page-sticker__content p {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 12; /* Максимум 12 строк текста */
  -webkit-box-orient: vertical;
}
</style>
