import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const jobRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({
            title: z.string().min(1),
            company: z.string().min(1),
            status: z.enum(['TO_APPLY', 'APPLIED', 'INTERVIEWING', 'OFFER'])
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.job.create({
                data: {
                    title: input.title,
                    company: input.company,
                    status: input.status,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            });
        }),

    getJobs: publicProcedure.query(async ({ ctx }) => {
        const jobs = await ctx.db.job.findMany({
            select: {
                id: true,
                title: true,
                company: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        return jobs ?? [];
    }),

    updateStatus: publicProcedure
        .input(z.object({
            id: z.number(),
            status: z.enum(['TO_APPLY', 'APPLIED', 'INTERVIEWING', 'OFFER'])
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.job.update({
                where: { id: input.id },
                data: {
                    status: input.status,
                    updatedAt: new Date(),
                },
            });
        }),
});