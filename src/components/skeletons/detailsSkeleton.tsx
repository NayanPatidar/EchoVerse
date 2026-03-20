"use client";
import { Box, Skeleton } from "@mui/material";
import { IoTimeOutline } from "react-icons/io5";

export default function DetailsSkeleton() {
  return (
    <div className="text-white flex flex-col">
      {/* Gradient Header Skeleton */}
      <div className="detail-page-header relative">
        <div className="absolute inset-0 bg-[#282828]" />
        <div className="relative z-1 flex items-end gap-6 p-6 md:p-8 pt-10 md:pt-14">
          <Skeleton
            sx={{ bgcolor: "grey.700", borderRadius: "6px", flexShrink: 0 }}
            variant="rectangular"
            width={220}
            height={220}
            className="!w-[140px] !h-[140px] md:!w-[220px] md:!h-[220px]"
          />
          <div className="flex flex-col justify-end gap-3 min-w-0 flex-1">
            <Skeleton
              sx={{ bgcolor: "grey.700", borderRadius: "4px" }}
              width={60}
              height={16}
            />
            <Skeleton
              sx={{ bgcolor: "grey.700", borderRadius: "4px" }}
              width="80%"
              height={52}
            />
            <Skeleton
              sx={{ bgcolor: "grey.700", borderRadius: "4px" }}
              width={300}
              height={20}
            />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col gap-5 p-5 md:p-6">
        {/* Quick actions skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton
            sx={{ bgcolor: "grey.700" }}
            variant="circular"
            width={48}
            height={48}
          />
          <Skeleton
            sx={{ bgcolor: "grey.700" }}
            variant="circular"
            width={32}
            height={32}
          />
          <Skeleton
            sx={{ bgcolor: "grey.700" }}
            variant="circular"
            width={32}
            height={32}
          />
        </div>

        {/* Column headers */}
        <div className="px-5 w-full border-[#61616167] border-b-[1px] grid grid-cols-3 text-[#d4d4d88c] text-xs Montserrat-regular items-center">
          <div className="w-10/12">
            <span className="pr-[22px]">#</span>
            <span>Title</span>
          </div>
          <div className="w-10/12 justify-self-start flex justify-center pl-10">
            Plays
          </div>
          <div className="w-1/12 justify-self-end pb-0.5 flex justify-end">
            <IoTimeOutline size={16} />
          </div>
        </div>

        {/* Song rows skeleton */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-2">
            <Skeleton
              sx={{ bgcolor: "grey.800", borderRadius: "2px" }}
              width={16}
              height={16}
            />
            <Skeleton
              sx={{ bgcolor: "grey.800", borderRadius: "4px" }}
              variant="rectangular"
              width={44}
              height={44}
            />
            <div className="flex-1 flex flex-col gap-1">
              <Skeleton
                sx={{ bgcolor: "grey.800", borderRadius: "4px" }}
                width="60%"
                height={18}
              />
              <Skeleton
                sx={{ bgcolor: "grey.800", borderRadius: "4px" }}
                width="40%"
                height={14}
              />
            </div>
            <Skeleton
              sx={{ bgcolor: "grey.800", borderRadius: "4px" }}
              width={40}
              height={14}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
