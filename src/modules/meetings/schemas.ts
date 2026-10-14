import { z } from "zod";

export const meetingsInsertionSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    agentsId: z.string().min(1, {message: "Agent is required"})
})

export const meetingsUpdateSchema = meetingsInsertionSchema.extend({
    id: z.string().min(1, {message: "ID is required"})
})