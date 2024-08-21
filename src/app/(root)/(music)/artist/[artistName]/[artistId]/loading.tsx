import { CardSkeleton, HorizontalSkeleton } from "@/components/skeletons";
import QuickMusicActions from "@/components/ui/quickMusicActions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Box, Skeleton } from "@mui/material";
import { IoTimeOutline } from "react-icons/io5";

export default function HomePageSkeleton() {
  return (
    <div className=" text-white flex flex-col p-5 gap-5">
      <div className=" w-full h-40 flex justify-start gap-5">
        {
          <Box
            sx={{
              width: 160,
              aspectRatio: "1 / 1",
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
              width="100%"
              height="100%"
            />
          </Box>
        }
        <div className=" flex flex-col justify-end gap-1">
          <span className=" source-sans-3-Bold text-6xl">
            <Skeleton sx={{ bgcolor: "grey.800" }} width={200} height={80} />
          </span>
          <div className=" h-[30px] flex flex-row gap-2">
            <div className=" flex flex-col justify-center ">
              <span className=" flex justify-center text-sm font-semibold gap-2">
                <Skeleton
                  sx={{ bgcolor: "grey.800" }}
                  width={400}
                  height={25}
                />
                <span className=" YearList font-normal">
                  <span></span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <QuickMusicActions />
      </div>
      <div className=" px-5 w-full border-[#61616167] border-b-[1px] grid grid-cols-3 text-[#d4d4d88c] text-xs Montserrat-regular items-center ">
        <span className=" w-6/12">
          <span className=" pr-[22px]">#</span>
          <span>Title</span>
        </span>
        <span className=" w-full pl-9 justify-self-end flex justify-center">
          Plays
        </span>
        <span className=" w-1/12 justify-self-end pb-0.5 flex justify-end">
          <IoTimeOutline size={16} />
        </span>
      </div>
      <div className=" text-2xl text first-letter:capitalize Montserrat-bold pl-2 cursor-default flex flex-col">
        <Skeleton
          sx={{ bgcolor: "grey.800" }}
          height={40}
          className=" w-full"
        />
        <Skeleton
          sx={{ bgcolor: "grey.800" }}
          height={40}
          className=" w-full"
        />
        <Skeleton
          sx={{ bgcolor: "grey.800" }}
          height={40}
          className=" w-full"
        />
      </div>
    </div>
  );
}
