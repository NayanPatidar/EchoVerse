import AudioPlayer from "@/components/audioplayer";
import ScrollAreaComponent from "@/components/ui/horizontalSliderArea";
import HorizontalScrollerCard from "@/components/ui/sliderCard";
import {
  getAlbumDetails,
  getArtistDetails,
  getArtistSongs,
  getHomeData,
  getPlaylist,
  getSongDetails,
  getTopSearches,
  getTrending,
  search,
} from "@/lib/api_jiosaavn";
import { setConfig } from "next/config";
import Image from "next/image";
import { useEffect, useState } from "react";

export default async function Home() {
  const homeData = await getHomeData();
  if (!homeData) {
    return;
  }

  return (
    <div className=" MusicPageMainDiv bg-black text-white relative">
      {Object.entries(homeData).map(([key, section]) => {
        if (
          "random_songs_listid" in section ||
          key === "artist_recos" ||
          key === "city_mod" ||
          key === "mixes" ||
          key === "discover"
        )
          return null;

        return (
          <div className=" text-white h-auto pl-8 pr-6">
            <div className=" pt-5 text-2xl text first-letter:capitalize Montserrat-bold w-full pl-3">
              {section.title}
            </div>
            <ScrollAreaComponent>
              {section.data.map(
                ({ id, name, url, subtitle, type, image, explicit }) => (
                  <HorizontalScrollerCard
                    key={id}
                    name={name}
                    url={url}
                    subtitle={subtitle}
                    type={type}
                    image={image}
                    explicit={explicit}
                  />
                )
              )}
            </ScrollAreaComponent>
          </div>
        );
      })}
    </div>
  );
}
