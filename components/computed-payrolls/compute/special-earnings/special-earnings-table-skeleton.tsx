import { Skeleton } from "@/components/ui/skeleton";

export default function SpecialEarningsTableSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Skeleton className="h-9" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-12" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
      </div>
    </div>
  );
}
