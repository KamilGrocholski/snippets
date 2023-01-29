import { z } from 'zod'
import { 
    snippetBase, 
    userBase
} from "./base";

export type UserProfileSchema = z.input<typeof userSchemes.updateMe>

export type SnippetCreateSchema = z.input<typeof snippetSchemes.create>
export type SnippetsFilter = z.input<typeof snippetsFilter>

export const snippetsFilter = z.object({
    time: z
        .literal('All time')
        .or(z.literal('Last year'))
        .or(z.literal('Last month'))
        .or(z.literal('Last week'))
        .or(z.literal('Last day')),
    language: z.string()
        .trim()
        .or(z.string().max(1))
        .transform(lang => !lang.length ? undefined : lang === 'All languages' ? undefined : lang)
        .optional(),
    search: z.string()
})

export const snippetSchemes = {
    getAllByUserIdPublic: z.object({
        userId: userBase.id
    }),
    infiniteSnippets: z.object({
        filter: snippetsFilter,
        cursor: snippetBase.id.optional(),
        limit: z
            .number()
            .min(1)
            .max(55)
            .optional()
            .default(25)
    }),
    getRecentlyAdded: z.object({}),
    getOneById: z.object({
        snippetId: snippetBase.id
    }),
    create: z.object({
        title: snippetBase.title,
        content: snippetBase.content,
        isPublic: snippetBase.isPublic,
        password: snippetBase.password,
        language: snippetBase.language,
    }),
    update: z.object({
        snippetId: snippetBase.id,
        title: snippetBase.title,
        content: snippetBase.content,
        isPublic: snippetBase.isPublic,
        language: snippetBase.language,
        password: snippetBase.password,
    }),
    delete: z.object({
        snippetId: snippetBase.id
    })
} 

export const userSchemes = {
    getUserProfile: z.object({
        userId: userBase.id
    }),
    updateMe: z.object({
        name: userBase.name,
        image: userBase.image,
        websiteUrl: userBase.websiteUrl
    })
}
