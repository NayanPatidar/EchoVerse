import AudioPlayer from "@/components/audioplayer";
import { getAlbumDetails, getArtistDetails, getArtistSongs, getHomeData, getPlaylist, getSongDetails, getTopSearches, search } from "@/lib/api_jiosaavn";
import Image from "next/image";
import { useEffect, useState } from "react";

export default async function Home() {
  const playlists = await search('Nadanniyan', 'song');
  console.log(playlists);


  // getTopSearch();

  // return Object.entries(playlists.songs).map(([key, value]) => {
  //   return (
  //     <div key={key} className=" text-white">
  //       <div className=" flex flex-row ">
  //         <img src={value.image[2].url} className=""/>
  //       </div>
  //     </div>
  //   );
  // });
}
