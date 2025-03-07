"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";
import {
  getAlbumDetails,
  getPlaylist,
  getSongDetails,
} from "@/lib/api_jiosaavn";
import { getHref, getImageURL } from "@/lib/utils";
import { Quality, Type } from "@/types";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";

interface HorizontalScrollerProps {
  id: string;
  name: string;
  subtitle?: string;
  type: Type;
  url: string;
  explicit?: boolean;
  image: Quality;
}

const HorizontalScrollerCard: React.FC<HorizontalScrollerProps> = ({
  id,
  name,
  subtitle,
  type,
  url,
  explicit,
  image,
}) => {
  const imageUrl = getImageURL(image);
  const { SetAudioFileLink, SetCurrentAudioIndex, SetAudioCurrentTimeStamp } =
    useAudioPlayer();

  async function PlayMedia() {
    const link = getHref(url, type);
    console.log(link);

    ///album/pushpa-2-the-rule/nTgWx7gW,8U_
    const idNew = url.split("/").pop();

    if (idNew === undefined) {
      return;
    }

    if (type === "song") {
      const Songs = await getSongDetails(idNew);
      SetCurrentAudioIndex(0);
      SetAudioCurrentTimeStamp(0);
      console.log(Songs);

      SetAudioFileLink(Songs?.songs);
    } else if (type === "album") {
      const AlbumSongs = await getAlbumDetails(idNew);
      SetCurrentAudioIndex(0);
      SetAudioCurrentTimeStamp(0);
      console.log(AlbumSongs);

      SetAudioFileLink(AlbumSongs?.songs);
    } else if (type === "playlist") {
      const PlaylistSongs = await getPlaylist(idNew);
      SetCurrentAudioIndex(0);
      SetAudioCurrentTimeStamp(0);
      console.log(PlaylistSongs);

      SetAudioFileLink(PlaylistSongs?.songs);
    }
  }

  return (
    <div className="media-element flex flex-col text-left">
      <Link href={getHref(url, type)} prefetch={true}>
        <Image
          src={imageUrl}
          alt=""
          className="media-elements-image"
          loading="lazy" // Lazy load by default in Next.js
          width={300} // Specify width
          height={200} // Specify height
        />
      </Link>
      <div className="PlaySymbolCard" onClick={() => PlayMedia()}>
        <FaPlay className="PlayIcon" />
      </div>
      <span className="lato-regular mt-5 md:text-base text-xs overflow-hidden whitespace-nowrap text-ellipsis">
        {name}
      </span>
      <span className="lato-regular text-gray-400 text-xs md:text-sm overflow-hidden whitespace-nowrap text-ellipsis">
        {subtitle}
      </span>
    </div>
  );
};

export default HorizontalScrollerCard;
