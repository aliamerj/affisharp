import { z } from "zod";
import { SERVERCALL } from "../constants";
import { DealsQuerySchema } from "@/schemas/deal_schema";

export const getDealByCompanyDeal = async (
  company: string,
  deal: string,
  token: string | null,
): Promise<
  (z.infer<typeof DealsQuerySchema> & { affilink?: string }) | null
> => {
  let headers: any = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  const res = await fetch(`${SERVERCALL}/api/deal/${company}/${deal}`, {
    headers,
  });
  if (!res.ok) return null;
  const body = await res.json();
  const validate = DealsQuerySchema.safeParse(body.body);
  if (!validate.success) return null;
  return { ...validate.data, affilink: body.affilink };
};
