import { CompanySchema, OnboardingSchema } from "@/schemas/onboarding_schema";
import { z } from "zod";
import { SERVERCALL } from "../constants";

export const getComapnyByUserId = async (
  userId: string,
): Promise<null | z.infer<typeof OnboardingSchema>> => {
  const res = await fetch(`${SERVERCALL}/api/company/view/?user=${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return null;
  const body = await res.json();
  const validate = CompanySchema.safeParse(body.body);
  if (!validate.success) return null;
  return validate.data;
};
