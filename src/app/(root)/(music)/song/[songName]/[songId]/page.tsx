"use server";
import ListAudioFiles from "@/components/listaudiofiles";
import QuickMusicActions from "@/components/ui/quickMusicActions";
import { getSongDetails } from "@/lib/api_jiosaavn";
import { getImageURL } from "@/lib/utils";
import Image from "next/image";
import { IoTimeOutline } from "react-icons/io5";

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
    <div className=" text-white flex flex-col p-5 gap-5">
      <div className=" w-full h-40 flex justify-start gap-5">
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
          <span className=" source-sans-3-Bold text-fit leading-tight max-h-[125px]">
            {songData.name}
          </span>
          <div className=" h-[30px] flex flex-row gap-2">
            <Image
              src={Artist}
              width={30}
              height={0}
              alt="Song Image"
              className=" rounded-full"
            />
            <div className=" flex flex-col justify-center ">
              <span className=" flex justify-center text-sm font-semibold gap-2">
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
      <div>{songData ? <QuickMusicActions Data={songObj?.songs} /> : ""} </div>
      <div className=" flex flex-col gap-1">
        <div className=" px-5 w-full border-[#61616167] border-b-[1px] grid grid-cols-3 text-[#d4d4d88c] text-xs Montserrat-regular items-center ">
          <div className="w-10/12">
            <span className=" pr-[22px]">#</span>
            <span>Title</span>
          </div>
          <div className="w-11/12 justify-self-start flex justify-center pl-16">
            Plays
          </div>
          <div className="w-1/12 justify-self-end pb-0.5 flex justify-end">
            <IoTimeOutline size={16} />
          </div>
        </div>
        <ListAudioFiles
          SongsData={songObj?.songs}
          isPlaylist={false}
          isArtist={false}
        />
      </div>
    </div>
  );
};

export default SongPage;
