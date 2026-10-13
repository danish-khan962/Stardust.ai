import { input, string, z } from "zod"

import React from 'react'
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init"
import { db } from '@/database'
import { agents, user } from '@/database/schema'
import { TRPCError } from '@trpc/server'
import { agentsInsertionSchema, agentsUpdateSchema } from '../schemas'
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm"
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants"

export const agentsRouter = createTRPCRouter({
    update:protectedProcedure
        .input(agentsUpdateSchema)
        .mutation(async ({ ctx, input }) => {
            const [updatedAgent] = await db
                .update(agents)
                .set(input)
                .where(
                    and(
                        eq(agents.id, input.id),
                        eq(agents.userId, ctx.auth.user.id)
                    )
                )
                .returning()

            if(!updatedAgent){
                throw new TRPCError({code: "NOT_FOUND", message: "Agent Not Found"})
            }

            return updatedAgent;
        }),

    remove: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [removedAgent] = await db
                .delete(agents)
                .where(
                    and(
                        eq(agents.id, input.id),
                        eq(agents.userId, ctx.auth.user.id)
                    )
                )
                .returning()

            if(!removedAgent){
                throw new TRPCError({code: "NOT_FOUND", message: "Agent Not Found"})
            }

            return removedAgent;
        }),

    getMany: protectedProcedure.input(
        z.object({
            page: z.number().default(DEFAULT_PAGE),
            pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
            search: z.string().nullish()
        })
    ).query(async ({ ctx, input }) => {
        const { page, pageSize, search } = input

        const data = await db.select({
            meetingCount: sql<number>`7`,
            ...getTableColumns(agents)
        }).from(agents)
            .where(
                and(
                    eq(agents.userId, ctx.auth.user.id),
                    search ? ilike(agents.name, `%${search}%`) : undefined
                )
            )
            .orderBy(desc(agents.createdAt), desc(agents.id))
            .limit(pageSize)
            .offset((page - 1) * pageSize)

        const [total] = await db
            .select({ count: count() })
            .from(agents)
            .where(
                and(
                    eq(agents.userId, ctx.auth.user.id),
                    search ? ilike(agents.userId, `%${search}%`) : undefined
                )
            )
        const totalPages = Math.ceil(total.count / pageSize)

        return {
            item: data,
            total: total.count,
            totalPages,
        };

    }),

    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        const [existingAgent] = await db.select({
            meetingCount: sql<number>`7`,
            ...getTableColumns(agents)
        })
            .from(agents)
            .where(
                and(
                    eq(agents.id, input.id),
                    eq(agents.userId, ctx.auth.user.id)
                )
            )

        if (!existingAgent) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Agent Not Found" })
        }

        return existingAgent;
    }),

    create: protectedProcedure
        .input(agentsInsertionSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input,
                    userId: ctx.auth.user.id
                })
                .returning();

            return createdAgent;
        }),
})