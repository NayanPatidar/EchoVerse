import AudioPlayer from "@/components/audioplayer";
import { getAlbumDetails, getHomeData, getPlaylist, getSongDetails } from "@/lib/api_jiosaavn";
import Image from "next/image";
import { useEffect, useState } from "react";

export default async function Home() {
  const playlists = await getAlbumDetails('-iNdCmFNV9o_');
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
