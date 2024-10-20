"use client";
import { getImageURL } from "@/lib/utils";
import { Quality, TopArtists, Type } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Artist {
  id: string;
  name: string;
  subtitle?: string;
  type: Type;
  url: string;
  explicit?: boolean;
  image: Quality;
}

const TopPlaylistCard: React.FC<Artist> = ({
  id,
  name,
  subtitle,
  type,
  explicit,
  image,
  url,
}) => {
  const imageUrl = getImageURL(image);
  const router = useRouter();

  function MediaClick() {
    if (type == "song") {
      router.push(`/song/${name}/${id}`);
    } else if (type == "album") {
      router.push(`/album/${name}/${id}`);
    } else if (type == "playlist") {
      router.push(`/playlist/${name}/${id}`);
    }
  }

  return (
    <div className="top-playlist-card" onClick={() => MediaClick()}>
      <img src={imageUrl} className="top-playlist-card-image" alt="" />
      <div className="  flex justify-center items-center w-[90px] md:w-[160px]">
        <span className=" text-xs md:text-base lato-regular mt-1 text-ellipsis overflow-hidden whitespace-nowrap">
          {name}
        </span>
      </div>
    </div>
  );
};

export default TopPlaylistCard;
