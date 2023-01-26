import { type RouterInputs, type RouterOutputs } from "../../../utils/api";
import getStringLengthInBytes from "../../../utils/getStringLengthInBytes";
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
                    },
                    language: {
                        equals: filter.language
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
                    language: true,
                    size: true,
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
    getOnyByIdRaw: publicProcedure
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
                    content: true
                }
            })
        }),    
    getOneById: publicProcedure
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
                    language: true,
                    size: true,
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
        .input(snippetSchemes.create)
        .mutation(({ctx, input}) => {
            const { title, content, language, isPublic } = input

            const size = getStringLengthInBytes(content) 

            return ctx.prisma.snippet.create({
                data: {
                    title,
                    content,
                    userId: ctx.session.user.id,
                    isPublic,
                    language,
                    size
                }
            })
        }),

    updateById: snippetOwnerProcedure
        .input(snippetSchemes.update)
        .mutation(({ctx, input}) => {
            const { snippetId, title, content, isPublic, language } = input

            const size = getStringLengthInBytes(content)

            return ctx.prisma.snippet.update({
                where: {
                    id: snippetId
                },
                data: {
                    title,
                    content,
                    language,
                    isPublic,
                    size
                }
            })
        }),
    
    delete: snippetOwnerProcedure
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
