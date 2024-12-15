// services/apiService.ts
import { useFetch } from "nuxt/app";
import type { ListType } from "@/types/index";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchCurrentUser() {
  try {
    const data = await $fetch<{ user: any }>(`${API_URL}/api/auth/current-user`, {
      method: "GET",
      credentials: "include", // Для отправки cookies
    });
    return data.user || null;
  } catch (error) {
    return null; // Если пользователь не авторизован
  }
}

export async function logoutUser() {
  await $fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include', // Для удаления cookie с токеном
  });
}


// Получение списка страниц (GET)
export async function fetchPages() {
  try {
    const data = await $fetch<ListType[]>(`${API_URL}/api/pages`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return data || [];
  } catch (error: any) {
    throw new Error(error.message || "Error fetching pages");
  }
}

// Получение страницы по ID (GET)
export async function fetchPageById(id: string) {
  try {
    const data = await $fetch<ListType>(`${API_URL}/api/pages/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return data || null;
  } catch (error: any) {
    throw new Error(error.message || "Error fetching page by ID");
  }
}

// Добавление страницы (POST)
export async function addPage(newPage: { title: string; content: string }) {
  try {
    return await $fetch<ListType>(`${API_URL}/api/pages`, {
      method: "POST",
      body: newPage,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error adding page");
    }
    throw new Error("Unknown error occurred while adding page");
  }
}

// Сохранение страницы (PUT)
export async function savePage(id: string, pageData: ListType) {
  try {
    await $fetch<void>(`${API_URL}/api/pages/${id}`, {
      method: "PUT",
      body: pageData,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error saving page");
    }
    throw new Error("Unknown error occurred while saving page");
  }
}

// Удаление страницы (DELETE)
export async function deletePage(id: string) {
  try {
    await $fetch<void>(`${API_URL}/api/pages/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error deleting page");
    }
    throw new Error("Unknown error occurred while deleting page");
  }
}
