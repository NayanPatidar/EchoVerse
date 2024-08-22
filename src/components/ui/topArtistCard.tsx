"use client";
import { getImageURL } from "@/lib/utils";
import { Quality, TopArtists } from "@/types";
import Image from "next/image";
import React from "react";

interface Artist {
  id: string;
  name: string;
  image: Quality;
  url: string;
  follower_count: number;
  is_followed: boolean;
}

const TopArtistCard: React.FC<Artist> = ({
  id,
  name,
  image,
  url,
  follower_count,
  is_followed,
}) => {
  const imageUrl = getImageURL(image);
  return (
    <div className="top-artist-card">
      <img src={imageUrl} className="top-artist-card-image" alt="" />
      <span className=" text-base lato-regular mt-1  overflow-hidden whitespace-nowrap text-ellipsis">
        {name}
      </span>
    </div>
  );
};

export default TopArtistCard;
