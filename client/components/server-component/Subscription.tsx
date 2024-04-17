import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GenerateAffilateBtn } from "@/components/generateAffilateBtn/GenerateAffilateBtn";
import { HandshakeIcon } from "lucide-react";
import { getDealByCompanyDeal } from "@/lib/api_handler/get_deal";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs";

export const Subscription = async ({
  company,
  deal,
}: {
  company: string;
  deal: string;
}) => {
  const { getToken } = auth();

  const targetDeal = await getDealByCompanyDeal(
    company,
    deal,
    await getToken(),
  );
  if (!targetDeal) return notFound();
  return (
    <div className="bg-white/30 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/60 max-w-md w-full text-center">
      <Avatar className="relative h-32 w-32 mx-auto rounded-full overflow-hidden shadow-md">
        <AvatarImage src={targetDeal.logo ?? ""} alt={targetDeal.name} />
        <AvatarFallback>
          <HandshakeIcon className="text-4xl font-bold h-36 w-24 text-gray-700" />
        </AvatarFallback>
      </Avatar>

      <h2 className="mt-4 text-4xl font-bold text-white">
        {targetDeal.name.replace("-", " ")}
      </h2>
      <p className="text-gray-200 mb-6">
        {targetDeal.CompanyID.charAt(0).toUpperCase() +
          targetDeal.CompanyID.slice(1)}
      </p>

      <GenerateAffilateBtn
        affilink={targetDeal.affilink}
        company={company}
        deal={deal}
      />
    </div>
  );
};
