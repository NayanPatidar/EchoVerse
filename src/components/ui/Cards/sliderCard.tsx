"use client";
import Link from "next/link";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import {
  getAlbumDetails,
  getPlaylist,
  getSongDetails,
} from "@/lib/api_jiosaavn";
import { getImageURL } from "@/lib/utils";
import { Quality, Type } from "@/types";
import { FaPlay } from "react-icons/fa";

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
    if (type === "song") {
      const Songs = await getSongDetails(id);
      SetCurrentAudioIndex(0);
      SetAudioCurrentTimeStamp(0);
      SetAudioFileLink(Songs?.songs);
    } else if (type === "album") {
      const AlbumSongs = await getAlbumDetails(id);
      SetCurrentAudioIndex(0);
      SetAudioCurrentTimeStamp(0);
      SetAudioFileLink(AlbumSongs?.songs);
    } else if (type === "playlist") {
      const PlaylistSongs = await getPlaylist(id);
      SetCurrentAudioIndex(0);
      SetAudioCurrentTimeStamp(0);
      SetAudioFileLink(PlaylistSongs?.songs);
    }
  }

  const linkPath =
    type === "song"
      ? `/song/${name}/${id}`
      : type === "album"
      ? `/album/${name}/${id}`
      : `/playlist/${name}/${id}`;

  return (
    <div className="media-element flex flex-col text-left">
      <Link href={linkPath} passHref>
        <img
          src={imageUrl}
          className="media-elements-image"
          alt={`${name} Thumbnail`}
        />
      </Link>
      <div className="PlaySymbolCard" onClick={PlayMedia}>
        <FaPlay className="PlayIcon" />
      </div>
      <Link href={linkPath} passHref>
        <span className="lato-regular mt-5 md:text-base text-xs overflow-hidden whitespace-nowrap text-ellipsis">
          {name}
        </span>
      </Link>
      {subtitle && (
        <span className="lato-regular text-gray-400 text-xs md:text-sm overflow-hidden whitespace-nowrap text-ellipsis">
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default HorizontalScrollerCard;
