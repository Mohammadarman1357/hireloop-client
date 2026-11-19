import { Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <div className="w-full space-y-5 animate-pulse">
      <Skeleton className="h-8 w-48 rounded-lg" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-32 w-full rounded-xl"
          />
        ))}
      </div>

      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}