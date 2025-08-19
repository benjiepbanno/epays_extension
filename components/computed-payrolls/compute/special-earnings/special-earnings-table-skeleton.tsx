import { Skeleton } from "@/components/ui/skeleton";

export default function SpecialEarningsTableSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <div className="flex flex-row flex-1 gap-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>

          <div>
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-9" />
          <Skeleton className="h-98" />
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex flex-row items-center gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-40" />
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
}
