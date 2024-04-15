import type { Config } from "drizzle-kit";
import { env } from "process";

export default {
  schema: "./db/schemas/*.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DRIZZLE_DATABASE_URL as string,
  },
} satisfies Config;
