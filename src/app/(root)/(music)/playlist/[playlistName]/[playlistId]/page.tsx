"use server";
import ListAudioFiles from "@/components/listaudiofiles";
import QuickMusicActions from "@/components/ui/quickMusicActions";
import {
  getPlaylist,
} from "@/lib/api_jiosaavn";
import { getImageURL } from "@/lib/utils";
import Image from "next/image";
import { IoTimeOutline } from "react-icons/io5";

const PlaylistPage = async ({
  params,
}: {
  params: { playlistName: string; playlistId: string };
}) => {
  
  const playlistObj = await getPlaylist(params.playlistId);

  if (!playlistObj?.image) {
    return;
  }

  const PlaylistImageLink = getImageURL(playlistObj?.image);

  const FollowerCountIn1000s = (followers?: number) => {
    if (!followers) {
      return;
    }
    return (followers / 1000).toFixed(1);
  };

  return (
    <div className=" text-white flex flex-col p-5 gap-5">
      <div className=" w-full h-40 flex justify-start gap-5">
        {
          <Image
            src={PlaylistImageLink}
            width={160}
            height={0}
            alt="Song Image"
            className=" rounded-sm"
          />
        }
        <div className=" flex flex-col justify-end gap-1">
          <span className=" source-sans-3-Bold text-fit leading-tight max-h-[125px]">
            {playlistObj?.name}
          </span>
          <div className=" h-[30px] flex flex-row gap-2">
            <div className=" flex flex-col justify-center ">
              <span className=" flex justify-center text-sm font-semibold gap-2">
                {playlistObj?.subtitle}
                {playlistObj.subtitle_desc.map((value, index) => {
                  return <div key={index}>{value}</div>;
                })}
                <span className=" YearList font-normal">
                  <li>
                    <span>{playlistObj?.year}</span>
                  </li>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {playlistObj.songs ? (
          <QuickMusicActions Data={playlistObj?.songs} />
        ) : (
          ""
        )}
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
      <ListAudioFiles
        SongsData={playlistObj.songs}
        isPlaylist={true}
        isArtist={false}
      />
    </div>
  );
};

export default PlaylistPage;
