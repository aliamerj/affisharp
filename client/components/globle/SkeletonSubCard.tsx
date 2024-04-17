import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonSubCard() {
  return (
    <div className="bg-white/30 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/60 max-w-md w-full text-center flex flex-col gap-2 justify-center items-center">
      <Skeleton className="relative h-32 w-32 mx-auto rounded-full overflow-hidden shadow-md" />
      <Skeleton className="mt-4 h-7 w-[150px]" />
      <Skeleton className="h-4 w-[50px]" />
      <Skeleton className="h-10 w-[250px]" />
    </div>
  );
}
