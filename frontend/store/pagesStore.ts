import { defineStore } from "pinia";
import { fetchPages, fetchPageById, addPage, savePage, deletePage, fetchShowCasePageById, fetchShowCasePages } from "../utils/apiService";
import { useAuthStore } from "./authStore";
import type { ListType } from "@/types/index";

export const usePagesStore = defineStore("pages", {
  state: () => ({
    list: [{
      _id: "1",
      title: "title",
      content: "<h1>Backend Showcase: Note-App</h1><h2>1. Дизайн-паттерны</h2><h3>Используемые паттерны:</h3><ol><li><p><strong>Singleton:</strong></p><ul><li><p>Применён для подключения к MongoDB через Mongoose.</p></li><li><p>Гарантирует, что во всём приложении используется только одно подключение к базе данных.</p></li></ul></li><li><p><strong>Middleware:</strong></p><ul><li><p>Используется для построения цепочек вызовов в Express.js.</p></li><li><p>Примеры: Middleware для авторизации, валидации данных и обработки ошибок.</p></li></ul></li><li><p><strong>Factory:</strong></p><ul><li><p>Используется для создания JWT-токенов с различными сроками действия (например, для токена доступа и рефреш-токена).</p></li></ul></li><li><p><strong>Strategy:</strong></p><ul><li><p>Реализует унифицированную обработку ошибок API (например, отправка статуса и сообщения клиенту в зависимости от типа ошибки).</p></li></ul></li></ol><hr><h2>2. Архитектурный подход (MVC)</h2><h3>Структура:</h3><ol><li><p><strong>Models (Модели):</strong></p><ul><li><p>Определяют структуру данных для пользователей и заметок в базе данных MongoDB.</p></li><li><p>Используются схемы и методы Mongoose.</p></li></ul></li><li><p><strong>Controllers (Контроллеры):</strong></p><ul><li><p>Обрабатывают входящие запросы.</p></li><li><p>Например, логика для входа, выхода, создания заметки, удаления заметки.</p></li></ul></li><li><p><strong>Views (Представления):</strong></p><ul><li><p>В контексте REST API отсутствуют, однако данные формируются в JSON-формате для клиента.</p></li></ul></li><li><p><strong>Services (Сервисы):</strong></p><ul><li><p>Инкапсулируют бизнес-логику, например, создание токенов, валидация данных и работа с базой данных.</p></li></ul></li><li><p><strong>Middleware:</strong></p><ul><li><p>Реализация промежуточной логики, например, проверка токенов и обработка ошибок.</p></li></ul></li></ol><hr><h2>3. Авторизация</h2><h3>Реализованные функции:</h3><ol><li><p><strong>JWT (JSON Web Token):</strong></p><ul><li><p>Токен создаётся при входе пользователя и хранится в HTTP-only cookies.</p></li><li><p>Токен содержит зашифрованный идентификатор пользователя.</p></li></ul></li><li><p><strong>Хранение токенов:</strong></p><ul><li><p>Используются безопасные куки:</p><ul><li><p><code>HttpOnly</code>: Предотвращает доступ к кукам из JavaScript.</p></li><li><p><code>Secure</code>: Передача только по HTTPS.</p></li><li><p><code>SameSite: none</code>: Позволяет междоменные запросы.</p></li></ul></li></ul></li><li><p><strong>Логаут:</strong></p><ul><li><p>Удаление токена из куков с помощью <code>res.clearCookie()</code>.</p></li><li><p>Указание параметров: <code>domain</code>, <code>path</code>, <code>httpOnly</code>, <code>secure</code>.</p></li></ul></li><li><p><strong>Middleware для авторизации:</strong></p><ul><li><p>Проверяет наличие и валидность токена.</p></li><li><p>При отсутствии или истечении токена возвращается ошибка 401.</p></li></ul></li></ol><hr><h2>4. Работа с заметками (CRUD)</h2><h3>Функции API:</h3><ol><li><p><strong>Создание заметки:</strong></p><ul><li><p>Валидация входящих данных через Joi.</p></li><li><p>Сохранение заметки в базе данных.</p></li></ul></li><li><p><strong>Чтение заметок:</strong></p><ul><li><p>Запросы с фильтрацией и пагинацией.</p></li><li><p>Оптимизация чтения через индексы MongoDB.</p></li></ul></li><li><p><strong>Обновление заметки:</strong></p><ul><li><p>Проверка прав пользователя на редактирование.</p></li><li><p>Обновление данных через <code>findByIdAndUpdate</code>.</p></li></ul></li><li><p><strong>Удаление заметки:</strong></p><ul><li><p>Проверка прав пользователя.</p></li><li><p>Удаление заметки через <code>findByIdAndDelete</code>.</p></li></ul></li></ol><hr><h2>5. Безопасность</h2><h3>Механизмы защиты:</h3><ol><li><p><strong>Хэширование паролей:</strong></p><ul><li><p>Используется библиотека <code>bcrypt</code>.</p></li><li><p>Пароли хранятся в зашифрованном виде, исключая утечку в случае компрометации базы данных.</p></li></ul></li><li><p><strong>Helmet:</strong></p><ul><li><p>Добавляет стандартные заголовки безопасности для предотвращения атак XSS и других уязвимостей.</p></li></ul></li><li><p><strong>CORS:</strong></p><ul><li><p>Настроен для работы с клиентом через <code>SameSite: none</code>.</p></li></ul></li><li><p><strong>Валидация данных:</strong></p><ul><li><p>Используется библиотека Joi для проверки данных, отправляемых клиентом.</p></li></ul></li><li><p><strong>Rate Limiting:</strong></p><ul><li><p>Лимитирование количества запросов (можно внедрить в будущем).</p></li></ul></li></ol><hr><h2>6. Масштабируемость</h2><h3>Подходы:</h3><ol><li><p><strong>Разделение логики:</strong></p><ul><li><p>Отдельные модули для работы с пользователями, заметками и авторизацией.</p></li></ul></li><li><p><strong>Поддержка новых функций:</strong></p><ul><li><p>Легко добавить OAuth для входа через Google или Facebook.</p></li><li><p>Возможность интеграции WebSocket для обновлений в реальном времени.</p></li></ul></li><li><p><strong>Производительность:</strong></p><ul><li><p>Оптимизация базы данных через индексы.</p></li><li><p>Пагинация для работы с большими объёмами данных.</p></li></ul></li></ol><hr><h2>7. Обработка ошибок</h2><h3>Унифицированный подход:</h3><ol><li><p><strong>Middleware:</strong></p><ul><li><p>Обрабатывает все ошибки, возникающие в приложении.</p></li><li><p>Примеры: 401 (Unauthorized), 403 (Forbidden), 500 (Internal Server Error).</p></li></ul></li><li><p><strong>Формат ответа:</strong></p><ul><li><p>Единый JSON-формат для ошибок (код статуса, сообщение, подробности).</p></li></ul></li><li><p><strong>Логирование:</strong></p><ul><li><p>Все ошибки записываются в консоль или файл логов для отладки.</p></li></ul></li></ol>",
      createdAt: new Date(),
      updatedAt: null,
    }] as ListType[],
    currentPage: {} as ListType,
    error: null as string | null,
    isLoading: false,
  }),

  actions: {
    handleError(error: any) {
      this.error = error.message || "An error occurred";
      console.error("Error in store:", error);
    },

    updateListItem(id: string, updatedData: Partial<ListType>) {
      const index = this.list.findIndex((page) => page._id === id);
      if (index !== -1) {
        this.list[index] = { ...this.list[index], ...updatedData };
      }
    },

    async fetchPages() {
      this.isLoading = true;
      try {
        this.list = await fetchPages();
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
        console.log(this.list);
      }
    },

    async fetchPageById(id: string) {
      const cachedPage = this.list.find((page) => page._id === id);
      if (cachedPage) {
        this.currentPage = cachedPage;
        return;
      }

      this.isLoading = true;
      try {
        const fetchedPage = await fetchPageById(id);
        this.currentPage = fetchedPage || {
          _id: "",
          title: "",
          content: "",
          createdAt: new Date(),
          updatedAt: null,
        };
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    // Для шоукейсинга - получение всех страниц
    async fetchShowCasePages() {
      this.isLoading = true;
      try {
        this.list = await fetchShowCasePages();
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    // Для шоукейсинга - получение страницы по ID
    async fetchShowCasePageById(id: string) {
      const cachedPage = this.list.find((page) => page._id === id);
      if (cachedPage) {
        this.currentPage = cachedPage;
        return;
      }

      this.isLoading = true;
      try {
        const fetchedPage = await fetchShowCasePageById(id);
        this.currentPage = fetchedPage || {
          _id: "",
          title: "",
          content: "",
          createdAt: new Date(),
          updatedAt: null,
        };
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    async addPage(title: string, content: string) {
      this.isLoading = true;
      try {
        const newPage = await addPage({ title, content });
        this.list.push(newPage);
        this.currentPage = newPage;
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    async savePage(id: string, pageData: ListType) {
      this.isLoading = true;
      try {
        await savePage(id, pageData);
        this.updateListItem(id, pageData); // Обновляем список
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    async deletePage(id: string) {
      this.isLoading = true;
      try {
        await deletePage(id);
        this.list = this.list.filter((page) => page._id !== id);
        this.error = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    clearPages() {
      this.list = [];
      this.currentPage = {} as ListType;
    },
  },
});


export function setupPagesStoreSubscriptions() {
  const pagesStore = usePagesStore();
  const authStore = useAuthStore();

  authStore.$subscribe((mutation, state) => {
    if (!state.currentUser) {
      pagesStore.clearPages(); // Очистить страницы, если пользователь вышел
    }
  });
}