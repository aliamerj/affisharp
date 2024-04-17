import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Subscription } from "@/components/server-component/Subscription";
import { SkeletonSubCard } from "@/components/globle/SkeletonSubCard";

const SubscriptionPage = ({ params }: { params: { slug: string[] } }) => {
  const company = params.slug[0];
  const deal = params.slug[1];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#135d66] to-[#0e4852]">
      <div className="bg-white/35 backdrop-blur-lg p-2 rounded-lg shadow-xl border border-white/60 max-w-md w-full text-center flex items-center justify-center mb-5">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="AffiSharp"
            width={250}
            height={100}
            priority
          />
        </Link>
      </div>
      <Suspense fallback={<SkeletonSubCard />}>
        <Subscription company={company} deal={deal} />
      </Suspense>
    </div>
  );
};

export default SubscriptionPage;
