import { Skeleton } from "@/components/ui/skeleton";

export default function NewSpecialEarningsFormSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9" />
        </div>
        <div className="col-span-1 space-y-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9" />
        </div>
        <div className="col-span-1 space-y-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9" />
        </div>
        <div className="col-span-1 space-y-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9" />
        </div>
        <div className="col-span-1 space-y-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9" />
        </div>
        <div className="col-span-1 space-y-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9" />
        </div>
        <div className="col-span-1 space-y-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9" />
        </div>
        <div className="col-span-2 justify-self-end">
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}
