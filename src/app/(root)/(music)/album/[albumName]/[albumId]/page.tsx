"use server";

import ListAudioFiles from "@/components/listaudiofiles";
import QuickMusicActions from "@/components/ui/quickMusicActions";
import { getAlbumDetails, getSongDetails } from "@/lib/api_jiosaavn";
import { getImageURL } from "@/lib/utils";
import Image from "next/image";
import { IoTimeOutline } from "react-icons/io5";

const AlbumPage = async ({
  params,
}: {
  params: { albumName: string; albumId: string };
}) => {
  const albumObj = await getAlbumDetails(params.albumId);
  // console.log(albumObj);

  // const songData = songObj?.songs[0];
  if (!albumObj?.image) {
    return;
  }

  const AlbumImageLink = getImageURL(albumObj?.image);
  const ArtistImageLink = getImageURL(
    albumObj.artist_map.primary_artists[0].image
  );
  console.log(albumObj.artist_map);

  return (
    <div className=" text-white flex flex-col p-5 gap-5">
      <div className=" w-full h-40 flex justify-start gap-5">
        {
          <Image
            src={AlbumImageLink}
            width={160}
            height={0}
            alt="Song Image"
            className=" rounded-sm"
          />
        }
        <div className=" flex flex-col justify-end gap-1">
          <span className=" source-sans-3-Bold text-6xl">{albumObj?.name}</span>
          <div className=" h-[30px] flex flex-row gap-2">
            <div className=" flex flex-col justify-center ">
              <span className=" flex justify-center text-sm font-semibold gap-2">
                {albumObj?.header_desc}
                <span className=" YearList font-normal">
                  <li>
                    <span>{albumObj?.year}</span>
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
        <span className=" w-4/12">
          <span className=" pr-5">#</span>
          <span>Title</span>
        </span>
        <span className=" w-3/12 justify-self-end flex justify-end">Plays</span>
        <span className=" w-1/12 justify-self-end pb-0.5 flex justify-end">
          <IoTimeOutline size={16} />
        </span>
      </div>
      <ListAudioFiles SongsData={albumObj.songs} isPlaylist={false} />
    </div>
  );
};

export default AlbumPage;