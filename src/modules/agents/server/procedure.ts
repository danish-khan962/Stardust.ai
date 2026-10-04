import React from 'react'
import { createTRPCRouter, baseProcedure } from "@/trpc/init"
import { db } from '@/database'
import { agents } from '@/database/schema'
import { TRPCError } from '@trpc/server'

export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const data = await db.select().from(agents);
        
        //For loading state:
        // await new Promise((resolve) => setTimeout(resolve, 5000))

        // For error state:
        // throw new TRPCError({code: "BAD_REQUEST"})

        return data;

    })
})