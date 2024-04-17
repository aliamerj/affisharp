import { z } from "zod";

export const DealSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Deal must be at least 3 characters long. " })
    .max(20, { message: "Deal cannot be more than 20 characters long." })
    .transform((name) => name.trim()),
  link: z.string().url({ message: "Please enter a valid URL" }),
  logo: z.string().url({ message: "Please enter a valid URL." }).optional(),
});

export const DealsQuerySchema = z.object({
  ID: z.number(),
  CreatedAt: z.string(),
  UpdatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  name: z.string(),
  logo: z.string().nullable(),
  CompanyID: z.string(),
  link: z.string(),
});
