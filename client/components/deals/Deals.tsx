import { getDealsByCompanyName } from "@/lib/api_handler/get_deals";
import { NewDealBtn } from "../newDealBtn/NewDealBtn";
import { DealCard } from "../dealCard/DealCard";

export const Deals = async ({ companyID }: { companyID: string }) => {
  const deals = await getDealsByCompanyName(companyID);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center">
        <div className="flex justify-between w-full">
          <h1 className="text-lg font-semibold md:text-2xl lg:text-3xl">
            Deals
          </h1>
          {deals.length > 0 && <NewDealBtn currentDeals={deals} />}
        </div>
      </div>
      <div
        className="flex flex-1 flex-col md:flex-row rounded-lg border border-dashed shadow-sm overflow-hidden"
        x-chunk="dashboard-02-chunk-1"
      >
        {deals.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-4 p-4 md:gap-6">
            {deals.map((d) => (
              <div
                key={d.ID}
                className="p-2 flex-1 basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <DealCard deal={d} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center justify-center gap-2 w-full p-10">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Deals
            </h3>
            <p className="text-sm text-gray-500">Create new affiliate Link</p>
            <NewDealBtn currentDeals={deals} />
          </div>
        )}
      </div>
    </div>
  );
};
