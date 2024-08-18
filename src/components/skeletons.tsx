import React from "react";
import Skeleton from "@mui/material/Skeleton";

export function CardSkeleton() {
  return (
    <div className="media-element flex flex-col text-left">
      <Skeleton sx={{ bgcolor: "grey.800" }} height={160} />
      <span className=" text-base lato-regular mt-5  overflow-hidden whitespace-nowrap text-ellipsis">
        <Skeleton sx={{ bgcolor: "grey.800" }} />
      </span>
      <span className=" lato-regular text-gray-400 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
        <Skeleton sx={{ bgcolor: "grey.800" }} />
      </span>
    </div>
  );
}

export function HorizontalSkeleton() {
  return <Skeleton sx={{ bgcolor: "grey.800" }} width={160} />;
}
