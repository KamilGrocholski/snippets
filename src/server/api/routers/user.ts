import { type RouterOutputs, type RouterInputs } from "../../../utils/api";
import { userSchemes } from "../schemes/schemes";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export type UserRouterOutputs = RouterOutputs['user']
export type UserRouterInputs = RouterInputs['user']

export const userRouter = createTRPCRouter({
    getUserProfile: publicProcedure
        .input(userSchemes.getUserProfile)
        .query(({ctx, input}) => {
            const { userId } = input

            return ctx.prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    image: true,
                    name: true,
                    email: true,
                    role: true,
                    websiteUrl: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: {
                        select: {
                            comments: true,
                            snippets: true
                        }
                    },

                }
            })
        }),

    getMe: protectedProcedure
        .query(({ctx}) => {
            
            return ctx.prisma.user.findUnique({
                where: {
                    id: ctx.session.user.id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    role: true,
                    websiteUrl: true,
                    createdAt: true,
                    updatedAt: true
                }
            }) 
        }),

    updateMe: protectedProcedure
        .input(userSchemes.updateMe)
        .mutation(({ctx,input}) => {
            const { name, image, websiteUrl } = input

            return ctx.prisma.user.update({
                where: {
                    id: ctx.session.user.id
                },
                data: {
                    name,
                    image,
                    websiteUrl
                }
            })
        })
})
