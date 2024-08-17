import { getImageURL } from "@/lib/utils";
import { Episode, Song, SongObj } from "@/types";
import Image from "next/image";
import React from "react";
import { FaPlay } from "react-icons/fa6";

interface AudioFiles {
  SongsData?: (Song | Episode)[];
  isPlaylist: boolean;
  isArtist: boolean;
}

function secondsToTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const ListAudioFiles: React.FC<AudioFiles> = ({
  SongsData,
  isPlaylist,
  isArtist,
}) => {
  if (!SongsData) {
    return;
  }
  return (
    <div className=" flex flex-col gap-2">
      {SongsData?.map((song, index) => {
        return (
          <div
            className=" ListAudioFiles flex text-[#d4d4d894] text-sm Montserrat-regular items-center px-5 cursor-pointer transform transition-transform duration-300 hover:bg-[#3636362a] hover:text-[#d4d4d8c5] rounded-sm h-12"
            key={index}
          >
            <span className=" w-6/12 flex gap-4 items-center">
              <span className="AudioFilesIndex w-[14px]">{index + 1} </span>
              <span className="AudioFilesPlayIcon">
                <FaPlay />
              </span>
              {isPlaylist ? (
                <span>
                  <Image
                    src={getImageURL(song?.image)}
                    alt="Song Image"
                    width={40}
                    height={40}
                    className=" rounded-md"
                  />
                </span>
              ) : (
                ""
              )}
              <span className=" w-8/12 text-[#d4d4d8]  overflow-hidden whitespace-nowrap text-ellipsis">
                {song.name}
              </span>
            </span>
            {isArtist ? (
              <span className=" w-3/12 justify-self-start flex justify-start whitespace-nowrap">
                <span>
                  <span className=" hover:text-white">
                    {song.artist_map.artists[0].name},{" "}
                  </span>
                  <span className=" hover:text-white">
                    {song.artist_map.artists[1].name}
                  </span>
                </span>
              </span>
            ) : (
              <span className=" w-2/12 justify-self-end flex justify-end">
                {song.play_count}
              </span>
            )}
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
