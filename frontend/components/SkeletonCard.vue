<template>
    <div class="container">
      <!-- Скелетон карточки -->
      <div class="page-sticker skeleton">
        <h3>Loading...</h3>
        <div class="page-sticker__content">
          <p>Where are the pages??? Why so long???</p>
        </div>
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
    height: 285px;
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
  
  /* Скелетон карточки с анимацией */
  .skeleton {
    background: linear-gradient(
      90deg,
      #2b2b2b 25%,
      #3e3e3e 50%,
      #2b2b2b 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  /* Анимация переливания */
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
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
    padding: 10px;
    border-radius: 6px;
  }
  
  .page-sticker__content p {
    margin-top: -4px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 12; /* Максимум 12 строк текста */
    -webkit-box-orient: vertical;
  }
  </style>
  