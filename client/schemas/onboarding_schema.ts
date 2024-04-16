import { z } from "zod";

export const OnboardingSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username cannot be more than 20 characters long." }),
});

export const CompanySchema = z.object({
  userId: z.string(),
  username: z.string(),
});
