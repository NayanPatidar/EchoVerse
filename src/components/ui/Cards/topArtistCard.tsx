"use client";
import { getHref, getImageURL } from "@/lib/utils";
import { Quality, TopArtists, Type } from "@/types";
import Image from "next/image";
import Link from "next/link";
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

  return (
    <div className="top-artist-card">
      <Link href={getHref(url, type)} prefetch={true}>
        <Image
          src={imageUrl}
          className="top-artist-card-image"
          alt=""
          width={300}
          height={200}
        />
      </Link>
      <span className=" text-xs md:text-base lato-regular mt-1 text-ellipsis overflow-hidden whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};

export default TopArtistCard;
