import type { ListType } from '../types/index';

const API_URL = import.meta.env.VITE_API_URL;

// Fetch страницы
export async function fetchPages(): Promise<ListType[]> {
    return $fetch(`${API_URL}/api/pages`);
  }
  
  // Добавление страницы
  export async function addPage(newPage: { title: string; content: string }): Promise<ListType> {
    return $fetch(`${API_URL}/api/pages`, {
      method: "POST",
      body: JSON.stringify(newPage),
      headers: { "Content-Type": "application/json" },
    });
  }
  
  // Удаление страницы
  export async function deletePage(id: string): Promise<void> {
    return $fetch(`${API_URL}/api/pages/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }

export async function savePage(id: string, pageData: any): Promise<void> {
  return $fetch(`${API_URL}/api/pages/${id}`, {
    method: 'PUT',
    body: pageData,
    headers: { 'Content-Type': 'application/json' },
  });
}
