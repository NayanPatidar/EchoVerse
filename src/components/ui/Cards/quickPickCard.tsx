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
      className="group flex items-center bg-white/[0.07] hover:bg-white/[0.15] rounded overflow-hidden transition-all duration-300 h-[48px] md:h-[56px] quick-pick-fade-in"
      aria-label={`Play ${name}`}
    >
      <Image
        src={imageUrl}
        alt={name}
        className="h-full w-[48px] md:w-[56px] object-cover flex-shrink-0"
        loading="lazy"
        width={56}
        height={56}
      />
      <span className="flex-1 text-white text-[12px] md:text-[14px] font-bold px-3 truncate">
        {name}
      </span>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          PlayMedia();
        }}
        className="opacity-0 group-hover:opacity-100 flex-shrink-0 w-10 h-10 rounded-full bg-[#1ed760] flex items-center justify-center mr-3 shadow-2xl shadow-black/60 transition-all duration-300 hover:scale-105 hover:bg-[#1fdf64]"
        aria-label={`Play ${name}`}
      >
        <FaPlay className="text-black text-[12px] ml-[2px]" />
      </button>
    </Link>
  );
};

export default QuickPickCard;
