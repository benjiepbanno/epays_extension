import { Skeleton } from "@/components/ui/skeleton";

export default function EditSpecialEarningsFormSkeleton() {
  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 space-y-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9" />
        </div>
        <div className="col-span-1 col-start-1 space-y-1">
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
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 space-y-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9" />
        </div>
        <div className="col-span-1 space-y-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9" />
        </div>
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-9 w-18" />
      </div>
    </div>
  );
}
