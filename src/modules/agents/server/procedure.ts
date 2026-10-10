import { z } from "zod"

import React from 'react'
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init"
import { db } from '@/database'
import { agents } from '@/database/schema'
import { TRPCError } from '@trpc/server'
import { agentsInsertionSchema } from '../schemas'
import { eq } from "drizzle-orm"

export const agentsRouter = createTRPCRouter({
    getMany: protectedProcedure.query(async () => {
        const data = await db.select().from(agents);
        
        //For loading state:
        // await new Promise((resolve) => setTimeout(resolve, 5000))

        // For error state:
        // throw new TRPCError({code: "BAD_REQUEST"})

        return data;

    }),

    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({input}) => {
        const [currentAgent] = await db.select().from(agents).where(eq(agents.id, input.id))

        return currentAgent;
    }),

    create: protectedProcedure
    .input(agentsInsertionSchema)
    .mutation(async ({input, ctx}) => {
        const [createdAgent] = await db
        .insert(agents)
        .values({
            ...input,
            userId: ctx.auth.user.id
        })
        .returning();

    return createdAgent;
    })
})