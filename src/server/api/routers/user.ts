import { z } from "zod";
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
                    _count: {
                        select: {
                            comments: true,
                            snippets: true
                        }
                    }
                }
            })
        })
})
