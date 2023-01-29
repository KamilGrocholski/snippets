import { z } from 'zod'

export const userBase = {
    id: z.string().cuid(),
    name: z.string()
        .trim()
        .min(5, {message: 'Name must contain at least 5 characters'})
        .max(55, {message: 'Name must contain at most 55 characters'}),
    websiteUrl: z.string()
        .trim()
        .url()
        .or(z.string().max(0))
        .transform(url => !url.length ? undefined : url)
        .optional(),
    image: z.string()
        .trim()
        .url()
        .or(z.string().max(0))
        .transform(url => !url.length ? undefined : url)
        .optional(),
}

export const snippetBase = {
    id: z.string().cuid(),
    title: z.string()
        .trim()
        .max(55, {message: 'Title must contain at most 55 characters'})
        .transform((title) => title.length ? title : undefined)
        .optional(),
    content: z.string()
        .trim()  
        .max(100_000_000),
    isPublic: z.boolean(),
    password: z.string()
        .trim()
        .max(555)
        .optional(),
    language: z.string().trim()
}

export const commentBase = {
    id: z.number(),
    comment: z.string()
        .trim()
        .min(1)
        .max(255)
}