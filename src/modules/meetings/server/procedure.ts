import { string, z } from "zod"

import React from 'react'
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { db } from '@/database'
import { agents, meetings } from '@/database/schema'
import { TRPCError } from '@trpc/server'
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm"
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants"
import { meetingsInsertionSchema, meetingsUpdateSchema } from "../schemas"
import { MeetingStatus } from "../types"
import { streamVideo } from "@/lib/stream-video"
import GeneratedAvatarUri from "@/lib/avatar"
import { botttsNeutral } from "@dicebear/collection"

export const meetingsRouter = createTRPCRouter({
    generateToken: protectedProcedure
        .mutation(async ({ ctx }) => {
            await streamVideo.upsertUsers([{
                id: ctx.auth.user.id,
                name: ctx.auth.user.name,
                image: ctx.auth.user.image ?? GeneratedAvatarUri({seed: ctx.auth.user.name, variant: "initials"}),
                role: "admin"
            }])

            const expirationTime = Math.floor(Date.now() / 1000) + 3600;
            const issuedAt = Math.floor(Date.now() / 1000) - 60;

            const token = streamVideo.generateUserToken({
                user_id: ctx.auth.user.id,
                exp: expirationTime,
                validity_in_seconds: issuedAt,
            })

            return token
        }),

    remove: protectedProcedure
        .input(z.object({ id: string() }))
        .mutation(async ({ ctx, input }) => {
            const [removedAgent] = await db
                .delete(meetings)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id)
                    )
                )
                .returning()

            if (!removedAgent) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Meeting Not Found" })
            }

            return removedAgent;
        }),


    update: protectedProcedure
        .input(meetingsUpdateSchema)
        .mutation(async ({ ctx, input }) => {
            const [updatedAgent] = await db
                .update(meetings)
                .set(input)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id)
                    )
                )
                .returning()

            if (!updatedAgent) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Meeting Not Found" })
            }

            return updatedAgent;
        }),

    getMany: protectedProcedure.input(
        z.object({
            page: z.number().default(DEFAULT_PAGE),
            pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
            search: z.string().nullish(),
            agentId: z.string().nullish(),
            status: z.enum([
                MeetingStatus.Upcoming,
                MeetingStatus.Active,
                MeetingStatus.Completed,
                MeetingStatus.Processing,
                MeetingStatus.Cancelled,
            ]).nullish()
        })
    ).query(async ({ ctx, input }) => {
        const { page, pageSize, search, status, agentId } = input

        const data = await db.select({
            ...getTableColumns(meetings),
            agent: agents,
            duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration")
        }).from(meetings)
            .innerJoin(agents, eq(meetings.agentsId, agents.id))
            .where(
                and(
                    eq(meetings.userId, ctx.auth.user.id),
                    search ? ilike(meetings.name, `%${search}%`) : undefined,
                    status ? eq(meetings.status, status) : undefined,
                    agentId ? eq(meetings.agentsId, agentId) : undefined,
                )
            )
            .orderBy(desc(meetings.createdAt), desc(meetings.id))
            .limit(pageSize)
            .offset((page - 1) * pageSize)

        const [total] = await db
            .select({ count: count() })
            .from(meetings)
            .innerJoin(agents, eq(meetings.agentsId, agents.id))
            .where(
                and(
                    eq(meetings.userId, ctx.auth.user.id),
                    search ? ilike(meetings.userId, `%${search}%`) : undefined,
                    status ? eq(meetings.status, status) : undefined,
                    agentId ? eq(meetings.agentsId, agentId) : undefined,
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
        const [existingMeeting] = await db.select({
            meetingCount: sql<number>`7`,
            ...getTableColumns(meetings),
            agent: agents,
            duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration")
        })
            .from(meetings)
            .innerJoin(agents, eq(meetings.agentsId, agents.id))
            .where(
                and(
                    eq(meetings.id, input.id),
                    eq(meetings.userId, ctx.auth.user.id)
                )
            )

        if (!existingMeeting) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Meeting Not Found" })
        }

        return existingMeeting;
    }),


    create: protectedProcedure
        .input(meetingsInsertionSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdMeeting] = await db
                .insert(meetings)
                .values({
                    ...input,
                    userId: ctx.auth.user.id
                })
                .returning();

            const call = streamVideo.video.call("default", createdMeeting.id);
            await call.create({
                data: {
                    created_by_id: ctx.auth.user.id,
                    custom: {
                        meetingId: createdMeeting.id,
                        meetingName: createdMeeting.name,
                    },
                    settings_override: {
                        transcription: {
                            language: "en",
                            mode: "auto-on",
                            closed_caption_mode: "auto-on",
                        },
                        recording: {
                            mode: "auto-on",
                            quality: "1080p",
                        }
                    }
                }
            })

            const [existingAgent] = await db
                .select()
                .from(agents)
                .where(
                    and(
                        eq(agents.id, createdMeeting.id)
                    )
                )
               
                if(!existingAgent){
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Agent not found"
                    })
                }

            await streamVideo.upsertUsers([
                {
                    id: existingAgent.id,
                    name: existingAgent.name,
                    role: "user",
                    image: GeneratedAvatarUri({
                        seed: existingAgent.name,
                        variant: "botttsNeutral"
                    })
                }
            ])

            
            return createdMeeting;
        }),
})