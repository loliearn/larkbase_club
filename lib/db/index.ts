import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// drizzle uses its own connection - keep as-is for now
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_paDV4usRh2Tq@ep-withered-violet-a4gr3xx4-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";

export const db = drizzle(neon(connectionString), { schema });
