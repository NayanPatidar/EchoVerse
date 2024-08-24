"use client";
import { getHref, getImageURL } from "@/lib/utils";
import { Quality, TopArtists, Type } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Artist {
  id: string;
  name: string;
  image: Quality;
  url: string;
  follower_count: number;
  is_followed: boolean;
  type: Type;
}

const TopArtistCard: React.FC<Artist> = ({
  id,
  name,
  image,
  url,
  follower_count,
  is_followed,
  type,
}) => {
  const imageUrl = getImageURL(image);
  const router = useRouter();

  function MediaClick() {
    if (type == "artist") {
      console.log(getHref(url, type));
      router.push(`/artist/${name}/${id}`);
    }
  }

  return (
    <div className="top-artist-card" onClick={() => MediaClick()}>
      <img src={imageUrl} className="top-artist-card-image" alt="" />
      <span className=" text-base lato-regular mt-1  overflow-hidden whitespace-nowrap text-ellipsis">
        {name}
      </span>
    </div>
  );
};

export default TopArtistCard;
