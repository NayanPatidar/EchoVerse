"use server";
import ListAudioFiles from "@/components/listaudiofiles";
import QuickMusicActions from "@/components/ui/quickMusicActions";
import { getArtistDetails } from "@/lib/api_jiosaavn";
import { getImageURL } from "@/lib/utils";
import Image from "next/image";
import { IoTimeOutline } from "react-icons/io5";

const ArtistPage = async ({
  params,
}: {
  params: { artistName: string; artistId: string };
}) => {
  const artistObj = await getArtistDetails(params.artistId);

  if (!artistObj?.image) {
    return;
  }

  const ArtistImageLink = getImageURL(artistObj?.image);

  return (
    <div className="text-white flex flex-col">
      {/* Gradient Header */}
      <div className="detail-page-header relative">
        <div className="absolute inset-0 detail-gradient-overlay" />
        <div className="relative z-1 flex items-end gap-6 p-6 md:p-8 pt-10 md:pt-14">
          <Image
            src={ArtistImageLink}
            width={220}
            height={220}
            alt={artistObj?.name || "Artist Image"}
            className="rounded-full shadow-2xl shadow-black/60 w-[140px] h-[140px] md:w-[220px] md:h-[220px] object-cover flex-shrink-0"
            quality={80}
            priority
          />
          <div className="flex flex-col justify-end gap-2 min-w-0">
            <span className="text-xs md:text-sm font-medium uppercase tracking-wider text-white/80">
              Artist
            </span>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold leading-tight line-clamp-2">
              {artistObj?.name}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-white/70 flex-wrap">
              <span>{artistObj?.follower_count?.toLocaleString()} monthly listeners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 p-5 md:p-6 bg-gradient-to-b from-[#1a1a1a] to-transparent">
        <div>
          <QuickMusicActions Data={artistObj.top_songs.slice(0, 10)} />
        </div>
        <h2 className="text-xl font-bold">Popular</h2>
        <div className="px-5 w-full border-[#61616167] border-b-[1px] grid grid-cols-3 text-[#d4d4d88c] text-xs Montserrat-regular items-center">
          <div className="w-10/12">
            <span className="pr-[22px]">#</span>
            <span>Title</span>
          </div>
          <div className="w-10/12 justify-self-start flex justify-center pl-10">
            Artists
          </div>
          <div className="w-1/12 justify-self-end pb-0.5 flex justify-end">
            <IoTimeOutline size={16} />
          </div>
        </div>
        <ListAudioFiles
          SongsData={artistObj?.top_songs.slice(0, 10)}
          isPlaylist={true}
          isArtist={true}
        />
      </div>
    </div>
  );
};

export default ArtistPage;
