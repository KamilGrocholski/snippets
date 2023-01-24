import { z } from 'zod'

export const userBase = {
    id: z.string().cuid(),
    name: z.string()
        .trim()
        .min(5)
        .max(55)
}

export const snippetBase = {
    id: z.string().cuid(),
    title: z.string()
        .trim()
        .min(1)
        .max(55),
    content: z.string()
        .trim()  
        .max(100_000_000),
    isPublic: z.boolean(),
    password: z.string()
        .trim()
        .max(555)
        .optional()
}

export const folderBase = {
    id: z.string(),
    name: z.string()    
        .trim()
        .min(1)
        .max(55)
}

export const commentBase = {
    id: z.number(),
    comment: z.string()
        .trim()
        .min(1)
        .max(255)
}