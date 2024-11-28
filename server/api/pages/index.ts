import { PageController } from "../../../backend/logic/pageController";

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;

    if (method === "GET") {
        // geting list of pages for sidebar
        return PageController.getAll();
    }

    if (method === "POST") {
        // creating new pages
        const body = await readBody(event);
        if (!body || !body.title || !body.content) {
            throw createError({ statusCode: 400, statusMessage: "Invalid data" });
        }
        return PageController.create(body.title, body.content);
    }

    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
});
