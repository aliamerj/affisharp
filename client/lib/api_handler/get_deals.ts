import { z } from "zod";
import { SERVERCALL } from "../constants";
import { DealsQuerySchema } from "@/schemas/deal_schema";
const DealsSchema = z.array(DealsQuerySchema);

export const getDealsByCompanyName = async (
  companyName: string,
): Promise<z.infer<typeof DealsSchema>> => {
  const res = await fetch(`${SERVERCALL}/api/deal/?company=${companyName}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return [];
  const body = await res.json();
  console.log(body);
  const validate = DealsSchema.safeParse(body.body);
  console.log(validate);
  if (!validate.success) return [];
  return validate.data;
};
