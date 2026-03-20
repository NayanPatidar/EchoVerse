"use server";
import ListAudioFiles from "@/components/listaudiofiles";
import QuickMusicActions from "@/components/ui/quickMusicActions";
import { getPlaylist } from "@/lib/api_jiosaavn";
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
    <div className="text-white flex flex-col">
      {/* Gradient Header */}
      <div className="detail-page-header relative">
        <div className="absolute inset-0 detail-gradient-overlay" />
        <div className="relative z-1 flex items-end gap-6 p-6 md:p-8 pt-10 md:pt-14">
          <Image
            src={PlaylistImageLink}
            width={220}
            height={220}
            alt={playlistObj?.name || "Playlist Image"}
            className="rounded-md shadow-2xl shadow-black/60 w-[140px] h-[140px] md:w-[220px] md:h-[220px] object-cover flex-shrink-0"
            quality={80}
            priority
          />
          <div className="flex flex-col justify-end gap-2 min-w-0">
            <span className="text-xs md:text-sm font-medium uppercase tracking-wider text-white/80">
              Playlist
            </span>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold leading-tight line-clamp-2">
              {playlistObj?.name}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-white/70 flex-wrap">
              {playlistObj?.subtitle && (
                <span>{playlistObj.subtitle}</span>
              )}
              {playlistObj?.subtitle_desc?.map((value, index) => (
                <span key={index} className="flex items-center gap-2">
                  <span className="text-white/40">•</span>
                  {value}
                </span>
              ))}
              {playlistObj?.year && (
                <>
                  <span className="text-white/40">•</span>
                  <span>{playlistObj.year}</span>
                </>
              )}
              {playlistObj?.songs && (
                <>
                  <span className="text-white/40">•</span>
                  <span>{playlistObj.songs.length} songs</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 p-5 md:p-6 bg-gradient-to-b from-[#1a1a1a] to-transparent">
        <div>
          {playlistObj.songs ? (
            <QuickMusicActions Data={playlistObj?.songs} />
          ) : (
            ""
          )}
        </div>
        <div className="px-5 w-full border-[#61616167] border-b-[1px] grid grid-cols-3 text-[#d4d4d88c] text-xs Montserrat-regular items-center">
          <div className="w-10/12">
            <span className="pr-[22px]">#</span>
            <span>Title</span>
          </div>
          <div className="w-10/12 justify-self-start flex justify-center pl-10">
            Plays
          </div>
          <div className="w-1/12 justify-self-end pb-0.5 flex justify-end">
            <IoTimeOutline size={16} />
          </div>
        </div>
        <ListAudioFiles
          SongsData={playlistObj.songs}
          isPlaylist={true}
          isArtist={false}
        />
      </div>
    </div>
  );
};

export default PlaylistPage;
