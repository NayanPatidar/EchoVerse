"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";
import {
  getAlbumDetails,
  getPlaylist,
  getSongDetails,
} from "@/lib/api_jiosaavn";
import { getHref, getImageURL } from "@/lib/utils";
import { Quality, Type } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface QuickPickProps {
  id: string;
  name: string;
  type: Type;
  url: string;
  image: Quality;
}

const QuickPickCard: React.FC<QuickPickProps> = ({
  id,
  name,
  type,
  url,
  image,
}) => {
  const imageUrl = getImageURL(image);
  const { SetAudioFileLink, SetCurrentAudioIndex, SetAudioCurrentTimeStamp } =
    useAudioPlayer();

  async function PlayMedia() {
    const idNew = url.split("/").pop();
    if (!idNew) return;

    let songs;
    if (type === "song") {
      songs = (await getSongDetails(idNew))?.songs;
    } else if (type === "album") {
      songs = (await getAlbumDetails(idNew))?.songs;
    } else if (type === "playlist") {
      songs = (await getPlaylist(idNew))?.songs;
    }

    if (songs) {
      SetCurrentAudioIndex(0);
      SetAudioCurrentTimeStamp(0);
      SetAudioFileLink(songs);
    }
  }

  if (!imageUrl || !name) return null;

  return (
    <Link
      href={getHref(url, type)}
      prefetch={true}
      className="group flex items-center bg-white/[0.06] hover:bg-white/[0.12] rounded-[4px] overflow-hidden transition-all duration-200 h-12 md:h-[52px] quick-pick-fade-in"
      aria-label={`Play ${name}`}
    >
      <Image
        src={imageUrl}
        alt={name}
        className="h-full w-12 md:w-[52px] object-cover flex-shrink-0"
        loading="lazy"
        width={52}
        height={52}
      />
      <span className="flex-1 text-white/90 text-[11px] md:text-[13px] Montserrat-bold px-3 truncate tracking-tight">
        {name}
      </span>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          PlayMedia();
        }}
        className="opacity-0 group-hover:opacity-100 flex-shrink-0 w-8 h-8 rounded-full bg-[#1ed760] flex items-center justify-center mr-2 shadow-xl shadow-black/50 transition-all duration-300 hover:scale-110 hover:bg-[#1fdf64]"
        aria-label={`Play ${name}`}
      >
        <FaPlay className="text-black text-[10px] ml-[2px]" />
      </button>
    </Link>
  );
};

export default QuickPickCard;
