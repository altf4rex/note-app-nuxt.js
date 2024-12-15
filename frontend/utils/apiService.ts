import type { ListType } from "@/types/index";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Fallback для локальной разработки

// Получение текущего пользователя
export async function fetchCurrentUser() {
  try {
    const data = await $fetch<{ user: any }>(`${API_URL}/api/auth/current-user`, {
      method: "GET",
      credentials: "include", // Для отправки cookies
    });
    return data.user || null;
  } catch (error: unknown) {
    console.error("Error fetching current user:", error);
    return null; // Возвращаем null для неавторизованного пользователя
  }
}

// Выход пользователя
export async function logoutUser() {
  try {
    await $fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error: unknown) {
    console.error("Error during logout:", error);
    throw new Error("Failed to log out");
  }
}

// Получение списка страниц
export async function fetchPages() {
  try {
    const data = await $fetch<ListType[]>(`${API_URL}/api/pages`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return data || [];
  } catch (error: unknown) {
    console.error("Error fetching pages:", error);
    throw new Error("Error fetching pages");
  }
}

// Получение страницы по ID
export async function fetchPageById(id: string) {
  try {
    const data = await $fetch<ListType>(`${API_URL}/api/pages/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return data || null;
  } catch (error: unknown) {
    console.error(`Error fetching page by ID (${id}):`, error);
    throw new Error("Error fetching page by ID");
  }
}

// Добавление страницы
export async function addPage(newPage: { title: string; content: string }) {
  try {
    return await $fetch<ListType>(`${API_URL}/api/pages`, {
      method: "POST",
      body: newPage,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  } catch (error: unknown) {
    console.error("Error adding page:", error);
    throw new Error("Error adding page");
  }
}

// Сохранение страницы
export async function savePage(id: string, pageData: ListType) {
  try {
    await $fetch<void>(`${API_URL}/api/pages/${id}`, {
      method: "PUT",
      body: pageData,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  } catch (error: unknown) {
    console.error(`Error saving page (${id}):`, error);
    throw new Error("Error saving page");
  }
}

// Удаление страницы
export async function deletePage(id: string) {
  try {
    await $fetch<void>(`${API_URL}/api/pages/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  } catch (error: unknown) {
    console.error(`Error deleting page (${id}):`, error);
    throw new Error("Error deleting page");
  }
}
