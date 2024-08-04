import AudioPlayer from "@/components/audioplayer";
import { getPlaylist } from "@/lib/api_jiosaavn";
import Image from "next/image";

export default async function Home() {
  const playlists = await getPlaylist(1219169738);
  // console.log(playlists?.songs[9].name);
  

  return <div></div>;
}
