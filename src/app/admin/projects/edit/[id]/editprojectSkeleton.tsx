"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function EditProjectSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      {/* Project Name */}
      <div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-10 w-full rounded" />
      </div>

      {/* Category */}
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full rounded" />
      </div>

      {/* Description */}
      <div>
        <Skeleton className="h-4 w-28 mb-2" />
        <Skeleton className="h-20 w-full rounded" />
      </div>

      {/* Technologies */}
      <div>
        <Skeleton className="h-4 w-40 mb-2" />
        <Skeleton className="h-10 w-full rounded" />
      </div>

      {/* Link */}
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-10 w-full rounded" />
      </div>

      {/* Submit Button */}
      <Skeleton className="h-10 w-40 rounded" />
    </div>
  );
}
