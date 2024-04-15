import { z } from "zod";

export const OnboardingSchema = z.object({
  userId: z.string(),
  name: z.string().min(1, { message: "Company name is required." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username cannot be more than 20 characters long." }),
  logo: z.string().url({ message: "Please enter a valid URL." }).optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 words." })
    .max(200, { message: "Description cannot exceed 200 words." })
    .transform((description) => description.trim()),
});

export const CompanySchema = z.object({
  ID: z.number(),
  CreatedAt: z.string(),
  UpdatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  userId: z.string(),
  name: z.string(),
  username: z.string(),
  logo: z.string(),
  description: z.string(),
});