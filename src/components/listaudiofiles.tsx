"use client";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { getImageURL } from "@/lib/utils";
import { Episode, Song, SongObj } from "@/types";
import Image from "next/image";
import React from "react";
import { FaPlay } from "react-icons/fa6";

interface AudioFiles {
  SongsData?: (Song | Episode)[];
  isPlaylist: boolean;
  isArtist: boolean;
}

function secondsToTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function formatPlayCount(count: number) {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return `${count}`;
}

const ListAudioFiles: React.FC<AudioFiles> = ({
  SongsData,
  isPlaylist,
  isArtist,
}) => {
  const { SetAudioFileLink, SetCurrentAudioIndex, SetAudioCurrentTimeStamp } =
    useAudioPlayer();

  const PlayAudioFile = (index: number) => {
    SetAudioFileLink(SongsData);
    SetCurrentAudioIndex(index);
    SetAudioCurrentTimeStamp(0);
  };

  if (!SongsData) {
    return;
  }
  return (
    <div className="flex flex-col gap-2">
      {SongsData?.map((song, index) => {
        return (
          <div
            className="ListAudioFiles grid grid-cols-3 text-[#d4d4d894] text-xs Montserrat-regular items-center px-5 cursor-pointer transform transition-transform duration-300 hover:bg-[#3636362a] hover:text-[#d4d4d8c5] rounded-sm h-12"
            key={index}
          >
            {/* Col 1: index + thumbnail + song name */}
            <div
              className="flex gap-3 items-center min-w-0"
              onClick={() => PlayAudioFile(index)}
            >
              <span className="AudioFilesIndex w-[14px] shrink-0 text-right">
                {index + 1}
              </span>
              <span className="AudioFilesPlayIcon shrink-0">
                <FaPlay />
              </span>
              {isPlaylist && (
                <Image
                  src={getImageURL(song?.image)}
                  alt="Song Image"
                  width={36}
                  height={36}
                  className="rounded-md shrink-0 w-9 h-9 object-cover"
                />
              )}
              <span className="text-[#d4d4d8] truncate text-xs">{song.name}</span>
            </div>

            {/* Col 2: artist or play count */}
            {isArtist ? (
              <div className="min-w-0 px-2">
                <span className="block truncate hover:text-white">
                  {song.artist_map.artists[0].name}
                  {song.artist_map.artists[1]
                    ? `, ${song.artist_map.artists[1].name}`
                    : ""}
                </span>
              </div>
            ) : (
              <div className="flex justify-center px-2">
                <span className="truncate tabular-nums">
                  {formatPlayCount(song.play_count)}
                </span>
              </div>
            )}

            {/* Col 3: duration */}
            <div className="flex justify-end tabular-nums shrink-0">
              {secondsToTime(song.duration)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ListAudioFiles;
