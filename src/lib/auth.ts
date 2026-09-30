import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/database";
import * as schema from "../database/schema"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // postegreSQL
        schema: {
            ...schema
        }
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: "clientID",
            clientSecret: "clientSecret"
        }
    }
})