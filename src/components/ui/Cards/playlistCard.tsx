"use client";
import { getImageURL } from "@/lib/utils";
import { Quality, TopArtists, Type } from "@/types";
import Image from "next/image";
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
    <div className="top-playlist-card">
      <img src={imageUrl} className="top-playlist-card-image" alt="" />
      <div className="  flex justify-center items-center w-[160px]">
        <span className=" text-base lato-regular mt-1 text-ellipsis overflow-hidden whitespace-nowrap ">
          {name}
        </span>
      </div>
    </div>
  );
};

export default TopPlaylistCard;
