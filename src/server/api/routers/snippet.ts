import { type RouterInputs, type RouterOutputs } from "../../../utils/api";
import { parseFromDateFilterValue } from "../../../utils/time";
import { 
    snippetSchemes 
} from "../schemes/schemes";

import { createTRPCRouter, publicProcedure, protectedProcedure, snippetOwnerProcedure } from "../trpc";

export type SnippetRouterOutputs = RouterOutputs['snippet']
export type SnippetRouterInputs = RouterInputs['snippet']

export const snippetRouter = createTRPCRouter({
    infiniteSnippets: protectedProcedure
        .input(snippetSchemes.infiniteSnippets)
        .query(async ({ctx, input}) => {
            const { cursor, limit, filter } = input

            const snippets = await ctx.prisma.snippet.findMany({
                take: limit + 1,    
                where: {
                    isPublic: true,
                    createdAt: {
                        gte: parseFromDateFilterValue(filter.time)
                    },
                    title: {
                        contains: filter.search
                    }
                },
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    content: true,
                    user: {     
                        select: {
                            id: true,
                            image: true,
                            name: true
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        }
                    }
                }
            })
            let nextCursor: typeof cursor | undefined = undefined;
            if (snippets.length > limit) {
                const nextSnippet = snippets.pop()
                nextCursor = nextSnippet?.id
            }
            return {
                snippets,
                nextCursor,
            };
        }),
    getRecentlyAdded: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/snippet/getRecentlyAdded',
                tags: ['snippet'],
                summary: 'Get recently added snippets'
            }
        })
        .input(snippetSchemes.getRecentlyAdded)
        .query(({ctx, input}) => {
            const {} = input

            return ctx.prisma.snippet.findMany({
                where: {
                    AND: [
                        {password: null},
                        {isPublic: true}
                    ]
                },
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            image: true,
                            name: true
                        }
                    },
                    _count: {
                        select: {
                            likes: true
                        }
                    }
                }
            })
        }),
    getOneById: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/snippet/get',
                tags: ['snippet'],
                summary: 'Get a snippet by id'
            }
        })
        .input(snippetSchemes.getOneById)
        .query(({ctx, input}) => {
            const { snippetId } = input

            return ctx.prisma.snippet.findFirst({
                where: {
                    AND: [
                        {id: snippetId},
                        {isPublic: true}
                    ]
                },
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    content: true,
                    user: {
                        select: {
                            id: true,
                            image: true,
                            name: true,
                            email: true,
                            role: true,
                            _count: {
                                select: {
                                    comments: true,
                                    snippets: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            likes: true
                        }
                    }
                }
            })
        }),
    create: protectedProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/snippet/create',
                tags: ['snippet'],
                summary: 'Create a new snippet'
            }
        })
        .input(snippetSchemes.create)
        .mutation(({ctx, input}) => {
            const { title, content, folderId, isPublic } = input

            return ctx.prisma.snippet.create({
                data: {
                    title,
                    content,
                    userId: ctx.session.user.id,
                    // folderId,
                    isPublic
                }
            })
        }),

    update: snippetOwnerProcedure
        .meta({
            openApi: {
                method: 'PUT',
                path: '/snippet/update',
                tags: ['snippet'],
                summary: 'Update a snippet'
            }
        })
        .input(snippetSchemes.update)
        .mutation(({ctx, input}) => {
            const { snippetId, title, content, folderId } = input

            return ctx.prisma.snippet.update({
                where: {
                    id: snippetId
                },
                data: {
                    title,
                    content,
                    folderId
                }
            })
        }),
    
    delete: snippetOwnerProcedure
        .meta({
            openApi: {
                method: 'DELETE',
                path: '/snippet/delete',
                tags: ['snippet'],
                summray: 'Delete a snippet'
            }
        })
        .input(snippetSchemes.delete)
        .mutation(({ctx, input}) => {
            const { snippetId } = input

            return ctx.prisma.snippet.delete({
                where: {
                    id: snippetId
                }
            })
        })
})
