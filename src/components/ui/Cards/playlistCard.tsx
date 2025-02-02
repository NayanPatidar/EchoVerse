"use client";
import { getHref, getImageURL } from "@/lib/utils";
import { Quality, Type } from "@/types";
import Image from "next/image";
import Link from "next/link";
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

  return (
    <Link href={getHref(url, type)} prefetch={true}>
      <div className="top-playlist-card">
        <img src={imageUrl} className="top-playlist-card-image" alt="" />
        <div className="flex justify-center items-center w-[90px] md:w-[160px]">
          <span className="text-xs md:text-base lato-regular mt-1 text-ellipsis overflow-hidden whitespace-nowrap">
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TopPlaylistCard;
