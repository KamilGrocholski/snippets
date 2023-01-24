import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "./root";

export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'Example API',
    description: 'Open api with tRPC',
    version: '1.0.0',
    baseUrl: 'http://localhost:3000/api',
    docsUrl: 'https://github.com/KamilGrocholski/jakistamprojekt',
    tags: ['example']
})