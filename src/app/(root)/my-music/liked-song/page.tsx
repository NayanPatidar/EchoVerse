"use client";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { useAuthProvider } from "@/context/AuthContext";
import { getSongDetails } from "@/lib/api_jiosaavn";
import { Episode, Song } from "@/types";
import { LikedSong } from "@/types/likedSong";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface AudioFiles {
  SongsData?: (Song | Episode)[];
  isPlaylist: boolean;
  isArtist: boolean;
}

const LikedSongs = () => {
  const [LikedSongData, SetLikedSongsData] = useState<LikedSong[] | null>(null);
  const [songs, SetSongs] = useState();
  const { token } = useAuthProvider();
  const {
    SetAudioFileLink,
    SetCurrentAudioIndex,
    SetDuration,
    SetAudioCurrentTimeStamp,
  } = useAudioPlayer();

  const LikedSongsData = async () => {
    if (!token) {
      return;
    }
    try {
      const res = await fetch("/api/likedSong", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const likedSongData = await res.json();
      SetLikedSongsData(likedSongData.data);
      console.log(likedSongData.data);
    } catch (error: any) {
      console.error("Found Error : " + error.message);
    }
  };

  const PlaySong = async (val: String) => {
    const songObj = await getSongDetails(val as string);
    const songData = songObj?.songs;

    SetAudioFileLink(songData);
    SetCurrentAudioIndex(0);
    SetAudioCurrentTimeStamp(0);
  };

  useEffect(() => {
    LikedSongsData();
  }, [token]);

  if (!LikedSongData || LikedSongData.length == 0) {
    return (
      <div className=" p-5">
        <div className=" text-xl font-semibold p-3 flexgap-2">Liked Songs</div>
        <div className="h-full w-full p-2 bg-[#252525] text-white">
          No Songs Found !
        </div>
      </div>
    );
  }

  return (
    <div className=" p-5">
      <div className=" text-xl font-semibold p-3 flexgap-2">Liked Songs</div>
      <div className=" flex flex-col gap-2">
        {Object.entries(LikedSongData).map(([key, val]) => {
          return (
            <div
              className="h-full w-full p-2 bg-[#252525] text-white rounded-md cursor-pointer"
              key={key}
              onClick={() => PlaySong(val.songId)}
            >
              <div className=" flex justify-start items-center h-full gap-2">
                <div>
                  {LikedSongData ? (
                    <Image
                      src={val.songImage as string}
                      alt="Song Image"
                      width={50}
                      height={50}
                      className=" rounded-md  cursor-pointer"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className=" h-full flex flex-col justify-center w-full  cursor-pointer">
                  {LikedSongData ? (
                    <div>
                      <div className=" w-full text-white text-sm Montserrat-regular overflow-hidden whitespace-nowrap text-ellipsis">
                        <span>{val.songName}</span>
                      </div>
                      <div className=" w-full text-white text-xs Montserrat-regular overflow-hidden whitespace-nowrap text-ellipsis">
                        <span>
                          <span className="text-white">
                            {val.songArtistPrimary}
                          </span>
                          {val.songArtistSecondary}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LikedSongs;
