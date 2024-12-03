import { Page } from "../backend-frontend/models/Page";

export async function fetchAllPages(): Promise<Pick<Page, "id" | "title">[]> {
    const response = await fetch('/api/pages');
    if (!response.ok) {
        throw new Error(`Failed to fetch pages: ${response.statusText}`);
    }
    return await response.json();
}

export async function fetchPageById(id: string): Promise<Page> {
    const response = await fetch(`/api/pages/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch page: ${response.statusText}`);
    }
    return await response.json();
}

export async function createPage(): Promise<Page> {
    const response = await fetch('/api/pages', {
        method: 'POST',
        body: JSON.stringify({ title: "Название страницы", content: "текст" }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error(`Failed to create page: ${response.statusText}`);
    }
    return await response.json();
}

export async function updatePage(id: string, data: Partial<Page>): Promise<Page> {
    const response = await fetch(`/api/pages/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error(`Failed to update page: ${response.statusText}`);
    }
    return await response.json();
}

export async function deletePage(id: string): Promise<void> {
    const response = await fetch(`/api/pages/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to delete page: ${response.statusText}`);
    }
}
