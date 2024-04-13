import type { NextAuthConfig } from "next-auth";
import google, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { databaseDrizzle } from "./db/database";
import { users } from "./db/schemas/userSchema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { CredentialsSignin } from "next-auth";

export default {
  providers: [
    google({
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials);
          const user = await databaseDrizzle
            .select()
            .from(users)
            .where(eq(users.email, email))
            .then((res) => res[0]);
          if (!user) throw new Error("Invalid email or password");

          if (!user.hashedPassword) {
            throw new Error("Please log in using the same method to continue");
          }
          const validatePassword = await bcrypt.compare(
            password,
            user.hashedPassword,
          );
          if (!validatePassword) throw new Error("Invalid email or password");
          const { hashedPassword, ...userWithoutPassword } = user;

          return userWithoutPassword;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          throw new CredentialsSignin("Invalid credentials");
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
