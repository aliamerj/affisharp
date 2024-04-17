import { z } from "zod";
import { SERVERCALL } from "../constants";

const affiLink = z.object({
  affilink: z.string(),
});

export const getAffiLink = async (
  dealName: string,
  companyName: string,
  token: string,
): Promise<null | z.infer<typeof affiLink>> => {
  const res = await fetch(`${SERVERCALL}/api/affi/${companyName}/${dealName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return null;
  const body = await res.json();
  const validate = affiLink.safeParse(body.body);
  if (!validate.success) return null;
  return validate.data;
};
