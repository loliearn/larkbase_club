import { neon } from "@neondatabase/serverless";

// 统一使用环境变量，fallback 为硬编码值供本地开发
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_paDV4usRh2Tq@ep-withered-violet-a4gr3xx4-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";

// Singleton neon connection - neon 内部会处理连接池
const sql = neon(connectionString);

export { sql };
