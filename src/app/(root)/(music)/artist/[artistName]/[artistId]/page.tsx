"use server";
import ListAudioFiles from "@/components/listaudiofiles";
import QuickMusicActions from "@/components/ui/quickMusicActions";
import {
  getAlbumDetails,
  getArtistDetails,
  getArtistSongs,
  getPlaylist,
  getSongDetails,
} from "@/lib/api_jiosaavn";
import { getImageURL } from "@/lib/utils";
import Image from "next/image";
import { IoTimeOutline } from "react-icons/io5";

const ArtistPage = async ({
  params,
}: {
  params: { artistName: string; artistId: string };
}) => {
  const artistObj = await getArtistSongs(params.artistId);

  if (!artistObj?.image) {
    return;
  }

  const ArtistImageLink = getImageURL(artistObj?.image);

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
            src={ArtistImageLink}
            width={160}
            height={0}
            alt="Song Image"
            className=" rounded-sm"
          />
        }
        <div className=" flex flex-col justify-end gap-1">
          <span className=" source-sans-3-Bold text-[5vw] leading-tight max-h-[125px]">
            {artistObj?.name}
          </span>
          <div className=" h-[30px] flex flex-row gap-2">
            <div className=" flex flex-col justify-center ">
              <span className=" flex justify-center text-sm font-semibold gap-2">
                <span className=" first-letter:uppercase ">
                  {artistObj?.type}
                </span>
                <span className=" YearList font-normal flex items-center">
                  <li>
                    <span>
                      {artistObj?.follower_count.toLocaleString()} Listeners
                    </span>
                  </li>
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
        <div className=" w-6/12">
          <span className=" pr-[22px]">#</span>
          <span>Title</span>
        </div>
        <div className=" w-full justify-self-start flex justify-center pl-9">
          Artists
        </div>
        <div className=" w-1/12 justify-self-end pb-0.5 flex justify-end">
          <IoTimeOutline size={16} />
        </div>
      </div>
      <ListAudioFiles
        SongsData={artistObj?.top_songs.songs}
        isPlaylist={true}
        isArtist={true}
      />
    </div>
  );
};

export default ArtistPage;
