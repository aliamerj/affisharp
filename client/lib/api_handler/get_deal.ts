import { z } from "zod";
import { SERVERCALL } from "../constants";
import { DealsQuerySchema } from "@/schemas/deal_schema";

export const getDealByCompanyDeal = async (
  company: string,
  deal: string,
): Promise<z.infer<typeof DealsQuerySchema> | null> => {
  const res = await fetch(`${SERVERCALL}/api/deal/${company}/${deal}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return null;
  const body = await res.json();
  const validate = DealsQuerySchema.safeParse(body.body);
  if (!validate.success) return null;
  return validate.data;
};
