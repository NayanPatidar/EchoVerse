// import { SliderCardSkeleton } from "@/components/skeletons";
import { CardSkeleton, HorizontalSkeleton } from "@/components/skeletons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Box, Skeleton } from "@mui/material";

export default function HomePageSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <div className="text-white relative pl-8 pr-6" key={i}>
      <div className=" pt-5 text-2xl text first-letter:capitalize Montserrat-bold pl-4 cursor-default">
        <Box
          sx={{
            width: 160,
          }}
          style={{
            borderRadius: "50%",
          }}
        >
          <Skeleton
            sx={{
              bgcolor: "grey.800",
              borderRadius: "4px",
            }}
            variant="rectangular"
          />
        </Box>
      </div>
      <ScrollArea>
        <div className="grid grid-flow-col grid-rows-1 place-content-start pb-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ));
}
