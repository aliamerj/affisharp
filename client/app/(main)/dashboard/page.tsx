import Link from "next/link";
import { Home, Plug } from "lucide-react";

import { DashboardNavbar } from "@/components/globle/DashboardNavbar";
import Image from "next/image";
import { GoProCard } from "@/components/custom/GoProCard";
import { Deals } from "@/components/deals/Deals";
import { headers } from "next/headers";
import { Suspense } from "react";
import Spinner from "@/components/globle/Spinner";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = searchParams;
  const activeProps = "bg-muted text-primary";
  const unactiveProps = "text-muted-foreground";
  const headersList = headers();
  const companyID = headersList.get("company");

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[80px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/images/logo.svg"
                width={200}
                height={50}
                alt="AffiSharp"
              />
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="?page=deals"
                className={`flex items-center gap-3 rounded-lg ${page === "deals" ? activeProps : unactiveProps} px-3 py-2 transition-all hover:text-primary`}
              >
                <Home className="h-4 w-4" />
                Deals
              </Link>
              <Link
                href="?page=integrations"
                className={`flex items-center gap-3 rounded-lg ${page === "integrations" ? activeProps : unactiveProps} px-3 py-2 transition-all hover:text-primary`}
              >
                <Plug className="h-4 w-4" />
                Integrations
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <GoProCard />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <DashboardNavbar />
        {page === "deals" ? (
          <Suspense fallback={<Spinner />}>
            <Deals companyID={companyID} />
          </Suspense>
        ) : (
          <h1>other one</h1>
        )}
      </div>
    </div>
  );
}
