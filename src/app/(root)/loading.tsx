"use client";
import { Skeleton } from "@mui/material";
import { usePathname } from "next/navigation";

export default function HomePageSkeleton() {
  const pathname = usePathname();

  if (pathname != "/") {
    return null;
  }

  return (
    <div className="p-4 md:p-6">
      {/* Greeting skeleton */}
      <div className="mb-6 pl-2">
        <Skeleton
          sx={{ bgcolor: "grey.800", borderRadius: "6px" }}
          width={220}
          height={36}
        />
      </div>

      {/* Quick picks skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8 px-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center bg-white/[0.07] rounded-md overflow-hidden h-[56px]">
            <Skeleton
              sx={{ bgcolor: "grey.700", flexShrink: 0 }}
              variant="rectangular"
              width={56}
              height={56}
            />
            <div className="px-3 flex-1">
              <Skeleton
                sx={{ bgcolor: "grey.700", borderRadius: "4px" }}
                width="80%"
                height={16}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Section rows skeleton */}
      {Array.from({ length: 3 }).map((_, sectionIdx) => (
        <div key={sectionIdx} className="mb-6 pl-2">
          <Skeleton
            sx={{ bgcolor: "grey.800", borderRadius: "6px", mb: 2 }}
            width={180}
            height={28}
          />
          <div className="grid grid-flow-col grid-rows-1 gap-2 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="card-container">
                <Skeleton
                  sx={{ bgcolor: "grey.800", borderRadius: "8px" }}
                  variant="rectangular"
                  className="card-image"
                  width="100%"
                  height={0}
                  style={{ paddingBottom: "100%" }}
                />
                <Skeleton
                  sx={{ bgcolor: "grey.800", borderRadius: "4px", mt: 1 }}
                  width="90%"
                  height={16}
                />
                <Skeleton
                  sx={{ bgcolor: "grey.800", borderRadius: "4px", mt: 0.5 }}
                  width="60%"
                  height={14}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
