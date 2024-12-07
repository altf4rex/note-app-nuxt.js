import type { ListType } from "../types/index";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch страницы
export async function fetchPages(): Promise<ListType[]> {
  try {
    return await $fetch(`${API_URL}/api/pages`);
  } catch (error) {
    console.error("Error fetching pages:", error);
    throw new Error("Failed to fetch pages. Please try again later.");
  }
}

// Получение страницы по ID
export async function fetchPageById(id: string): Promise<ListType> {
  try {
    return await $fetch(`${API_URL}/api/pages/${id}`);
  } catch (error) {
    console.error("Error fetching page by ID:", error);
    throw new Error("Failed to fetch the page. Please try again later.");
  }
}

// Добавление страницы
export async function addPage(newPage: { title: string; content: string }): Promise<ListType> {
  try {
    return await $fetch(`${API_URL}/api/pages`, {
      method: "POST",
      body: JSON.stringify(newPage),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding page:", error);
    throw new Error("Failed to add the page. Please try again later.");
  }
}

// Удаление страницы
export async function deletePage(id: string): Promise<void> {
  try {
    await $fetch(`${API_URL}/api/pages/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting page:", error);
    throw new Error("Failed to delete the page. Please try again later.");
  }
}

// Сохранение страницы
export async function savePage(id: string, pageData: ListType): Promise<void> {
  try {
    await $fetch(`${API_URL}/api/pages/${id}`, {
      method: "PUT",
      body: pageData,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving page:", error);
    throw new Error("Failed to save the page. Please try again later.");
  }
}
