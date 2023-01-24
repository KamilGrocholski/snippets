import { z } from 'zod'
import { 
    snippetBase, 
    folderBase, 
    userBase
} from "./base";

export type SnippetCreateSchema = z.input<typeof snippetSchemes.create>

export const snippetSchemes = {
    getRecentlyAdded: z.object({}),
    getOneById: z.object({
        snippetId: snippetBase.id
    }),
    create: z.object({
        title: snippetBase.title,
        content: snippetBase.content,
        isPublic: snippetBase.isPublic,
        password: snippetBase.password,
        folderId: folderBase.id.optional()
    }),
    update: z.object({
        snippetId: snippetBase.id,
        title: snippetBase.title,
        content: snippetBase.content,
        isPublic: snippetBase.isPublic,
        password: snippetBase.password,
        folderId: folderBase.id.optional(),
    }),
    delete: z.object({
        snippetId: snippetBase.id
    })
} 

export const userSchemes = {
    getUserProfile: z.object({
        userId: userBase.id
    })
}
