// server/api/pages.ts
import { PageController } from "../../backend/logic/pageController";

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;

    if (method === "GET") {
        return PageController.getAll();
    }

    if (method === "POST") {
        const body = await readBody(event);
        if (!body || !body.title || !body.content) {
            throw createError({ statusCode: 400, statusMessage: "Invalid data" });
        }
        return PageController.create(body.title, body.content);
    }

    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
});

