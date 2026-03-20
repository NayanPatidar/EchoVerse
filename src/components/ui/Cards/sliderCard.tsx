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
import { FaPlay } from "react-icons/fa";
import Image from "next/image";

interface HorizontalScrollerProps {
  id: string;
  name: string;
  subtitle?: string;
  type: Type;
  url: string;
  explicit?: boolean;
  image: Quality;
}

const HorizontalScrollerCard: React.FC<HorizontalScrollerProps> = ({
  id,
  name,
  subtitle,
  type,
  url,
  explicit,
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

  const isArtist = type === "artist";

  return (
    <div className="group card-container flex flex-col text-left">
      <div className={`relative ${isArtist ? "" : "rounded-md"} overflow-hidden`}>
        <Link href={getHref(url, type)} prefetch={true}>
          <Image
            src={imageUrl}
            alt={name}
            className={`card-image transition-transform duration-300 ease-out group-hover:scale-[1.03] ${
              isArtist ? "!rounded-full" : ""
            }`}
            loading="lazy"
            width={300}
            height={300}
          />
          {/* Hover shadow overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isArtist ? "rounded-full" : ""
            }`}
          />
        </Link>
        <button
          onClick={() => PlayMedia()}
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-[#1ed760] flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out shadow-2xl shadow-black/70 hover:scale-105 hover:bg-[#1fdf64] z-10"
          aria-label={`Play ${name}`}
        >
          <FaPlay className="text-black text-[16px] ml-[2px]" />
        </button>
      </div>
      <span className="font-bold mt-2 md:text-[14px] text-[12px] overflow-hidden whitespace-nowrap text-ellipsis text-white leading-snug">
        {name}
      </span>
      {subtitle && (
        <span className="font-normal text-[#b3b3b3] text-[11px] md:text-[13px] overflow-hidden whitespace-nowrap text-ellipsis mt-0.5 leading-normal">
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default HorizontalScrollerCard;
