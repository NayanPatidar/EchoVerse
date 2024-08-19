import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

export function CardSkeleton() {
  return (
    <div className="media-element flex flex-col text-left">
      <Box
        sx={{
          width: 160,
          aspectRatio: "1 / 1",
        }}
        style={{
          borderRadius: "50%", // Fully rounded (circle)
        }}
      >
        <Skeleton
          sx={{
            bgcolor: "grey.800",
            borderRadius: "4px",
          }}
          variant="rectangular"
          width="100%"
          height="100%"
        />
      </Box>
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
