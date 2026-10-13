import { z } from "zod";

export const agentsInsertionSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    instructions: z.string().min(1, {message: "Instruction is required"})
})

export const agentsUpdateSchema = agentsInsertionSchema.extend({
    id: z.string().min(1, {message: "ID is required"})
})