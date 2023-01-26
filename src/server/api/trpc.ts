import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";

import { getServerAuthSession } from "../auth";
import { prisma } from "../db";

type CreateContextOptions = {
  session: Session | null;
};

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({
    session,
  });
};

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { snippetBase } from "./schemes/base";

export const t = initTRPC
  .context<typeof createTRPCContext>()
  .create({
    transformer: superjson,
    errorFormatter({ shape }) {
      return shape;
    },
});


export const createTRPCRouter = t.router;

const performanceMiddleware = t.middleware(async ({path, type, next}) => {
  performance.mark('Start')
  const result = await next()
  performance.mark('End')
  performance.measure(`[${result.ok ? "OK" : "ERROR"}][$1] ${type} '${path}'`, "Start", "End")
  return result
})


export const publicProcedure = t.procedure.use(performanceMiddleware);


const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(performanceMiddleware).use(enforceUserIsAuthed);

export const snippetOwnerProcedure = protectedProcedure
    .input(z.object({
        snippetId: snippetBase.id
    }))
    .use(async ({ctx, input, next}) => {
        const snippet = await ctx.prisma.snippet.findUnique({
            where: {
                id: input.snippetId
            },
            select: {
                userId: true
            }
        })

        if (!snippet) throw new TRPCError({code: 'NOT_FOUND'})

        if (snippet.userId !== ctx.session.user.id) throw new TRPCError({code: 'UNAUTHORIZED'})

        return next({
            ctx: {
                session: ctx.session,
                input: {
                    snippetId: snippetBase.id
                }
            }
        })
    })