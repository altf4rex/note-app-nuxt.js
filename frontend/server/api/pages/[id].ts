import { PageController } from "../../../backend-frontend/logic/pageController";

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    const id = event.context.params?.id;

    if (!id) {
        throw createError({ statusCode: 400, statusMessage: "Page ID is required" });
    }

    if (method === "GET") {
        // returning page by id
        const page = PageController.getById(id);
        if (!page) {
            throw createError({ statusCode: 404, statusMessage: "Page not found" });
        }
        return page;
    }

    if (method === "PUT") {
        // updating page's data  
        const body = await readBody(event);
        if (!body || !body.title || !body.content) {
            throw createError({ statusCode: 400, statusMessage: "Invalid data" });
        }
        return PageController.update(id, body.title, body.content);
    }

    if (method === "DELETE") {
        // deleting page by id
        const deleted = PageController.delete(id);
        if (!deleted) {
            throw createError({ statusCode: 404, statusMessage: "Page not found" });
        }
        return { message: "Page deleted successfully" };
    }

    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
});
