import NextAuth from "next-auth"
import { databaseDrizzle } from "./db/database";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import authConfig from "./_auth.config"
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages:{
  signIn: '/auth/login',
  },
  adapter:DrizzleAdapter(databaseDrizzle),
  session: { strategy: "jwt" },
  ...authConfig,

})
