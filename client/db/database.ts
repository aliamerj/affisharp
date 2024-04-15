import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as users from "./schemas/userSchema";
const schema = {
  ...users,
};
const connection = process.env.DRIZZLE_DATABASE_URL as string;

//export const migrationClient = postgres(connection, { max: 1 });
const queryClient = postgres(connection);
export const databaseDrizzle = drizzle(queryClient, { schema });
export const migrationClient = migrate(databaseDrizzle, {
  migrationsFolder: "drizzle",
});
