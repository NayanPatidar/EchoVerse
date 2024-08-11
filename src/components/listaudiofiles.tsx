import { Episode, Song, SongObj } from "@/types";
import React from "react";

interface AudioFiles {
  SongsData?: (Song | Episode)[];
}

function secondsToTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const ListAudioFiles: React.FC<AudioFiles> = ({ SongsData }) => {
  console.log(SongsData);
  return (
    <div>
      {SongsData?.map((song, index) => {
        return (
          <div
            className="flex text-[#d4d4d894] text-xs Montserrat-regular items-center px-5 cursor-pointer transform transition-transform duration-300 hover:bg-[#3636362a] hover:text-[#d4d4d8] rounded-sm h-12"
            key={index}
          >
            <span className=" w-6/12">
              <span className=" pr-5">{index + 1} </span>
              <span className=" text-[#d4d4d8]">{song.name} </span>
            </span>
            <span className=" w-2/12 justify-self-end flex justify-end">
              {song.play_count}
            </span>
            <span className=" w-4/12 justify-self-end pb-0.5 flex justify-end">
              {secondsToTime(song.duration)}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default ListAudioFiles;
