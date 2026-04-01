import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "ep-withered-violet-a4gr3xx4-pooler.us-east-1.aws.neon.tech",
    port: 5432,
    database: "neondb",
    user: "neondb_owner",
    password: "npg_paDV4usRh2Tq",
    ssl: true,
  },
});
