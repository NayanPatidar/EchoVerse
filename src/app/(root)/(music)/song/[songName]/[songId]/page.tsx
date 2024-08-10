"use server";

import { getSongDetails } from "@/lib/api_jiosaavn";
import { getImageURL } from "@/lib/utils";
import Image from "next/image";
import { IoIosPlayCircle } from "react-icons/io";

const SongPage = async ({
  params,
}: {
  params: { songName: string; songId: string };
}) => {
  const songObj = await getSongDetails(params.songId);
  const songData = songObj?.songs[0];
  if (!songData?.image) {
    return;
  }

  const SongImageLink = getImageURL(songData?.image);
  const Artist = getImageURL(songData.artist_map.primary_artists[0].image);

  return (
    <div className=" text-white flex flex-col p-5">
      <div className=" w-full flex justify-start gap-5">
        {
          <Image
            src={SongImageLink}
            width={160}
            height={0}
            alt="Song Image"
            className=" rounded-sm"
          />
        }
        <div className=" flex flex-col justify-end gap-1">
          <span className=" source-sans-3-Bold text-8xl">{songData.name}</span>
          <div className=" flex flex-row gap-2">
            <Image
              src={Artist}
              width={30}
              height={0}
              alt="Song Image"
              className=" rounded-full"
            />
            <div className=" flex flex-col justify-center ">
              <span className=" flex  justify-center text-sm font-semibold gap-2">
                {songData.artist_map.primary_artists[0].name}
                <span className=" YearList font-normal">
                  <li>
                    <span>{songData.year}</span>
                  </li>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongPage;
