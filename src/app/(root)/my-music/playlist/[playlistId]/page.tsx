"use client";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { useAuthProvider } from "@/context/AuthContext";
import { getSongDetails } from "@/lib/api_jiosaavn";
import { Episode, Song } from "@/types";
import { LikedSong } from "@/types/likedSong";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AudioFiles {
  SongsData?: (Song | Episode)[];
  isPlaylist: boolean;
  isArtist: boolean;
}

const LikedSongs = ({ params }: { params: { playlistId: string } }) => {
  const [PlaylistData, SetPlaylistData] = useState<LikedSong[] | null>(null);
  const [songs, SetSongs] = useState(null);
  const [loading, SetLoading] = useState(true);
  const { token } = useAuthProvider();
  const {
    SetAudioFileLink,
    SetCurrentAudioIndex,
    SetDuration,
    SetAudioCurrentTimeStamp,
  } = useAudioPlayer();

  const PlaylistSongsData = async () => {
    if (!token) {
      return;
    }
    try {
      const res = await fetch("/api/playlistSong", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          PlaylistId: `${params.playlistId}`,
        },
      });

      const PlaylistSongs = await res.json();
      SetPlaylistData(PlaylistSongs.data);
    } catch (error: any) {
      console.error("Found Error : " + error.message);
    } finally {
      SetLoading(false);
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
    PlaylistSongsData();
  }, [token]);

  if (loading) {
    return (
      <div className="md:p-5 p-3">
        <div className="md:text-xl text-base  font-semibold p-3 flex gap-2">
          Playlist Songs
        </div>
        <div className="h-full w-full p-2 text-white Montserrat-regular flex justify-center text-base ">
          Loading ...
        </div>
      </div>
    );
  }

  if (!PlaylistData || PlaylistData.length === 0) {
    return (
      <div className="md:p-5 p-3">
        <div className="md:text-xl text-base  font-semibold p-3 flex gap-2">
          Playlist Songs
        </div>
        <div className="h-full w-full p-2 text-white pl-3 md:text-base text-sm ">
          No Songs Found!
        </div>
      </div>
    );
  }

  return (
    <div className="md:p-5 p-3">
      <div className=" md:text-xl text-base  font-semibold p-3 flex gap-2">
        Playlist Songs
      </div>
      <div className=" flex flex-col gap-2">
        {Object.entries(PlaylistData).map(([key, val]) => {
          return (
            <div
              className="h-full w-full p-2 bg-[#252525] text-white rounded-md cursor-pointer"
              key={key}
              onClick={() => PlaySong(val.songId)}
            >
              <div className=" flex justify-start items-center h-full gap-2">
                <div>
                  {PlaylistData ? (
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
                  {PlaylistData ? (
                    <div>
                      <div className=" w-full text-white text-sm Montserrat-regular overflow-hidden whitespace-nowrap text-ellipsis">
                        <span>{val.songName}</span>
                      </div>
                      <div className=" w-full text-white text-xs Montserrat-regular overflow-hidden whitespace-nowrap text-ellipsis">
                        <span>
                          <span className="text-white">
                            {val.songArtistPrimary}
                          </span>
                          , {val.songArtistSecondary}
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
