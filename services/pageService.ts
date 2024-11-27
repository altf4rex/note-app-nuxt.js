import {Page} from "../backend/models/Page"

// services/pageService.ts
export async function fetchAllPages() {
    const response = await fetch('/api/pages');
    if (!response.ok) {
        throw new Error(`Failed to fetch pages: ${response.statusText}`);
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
