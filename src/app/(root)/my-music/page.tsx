"use client";
import { useAuthProvider } from "@/context/AuthContext";
import { Heart, ListMusic, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { PlaylistForm } from "@/components/ui/NewPlaylistForm";
import { useRouter } from "next/navigation";
import { useGeneralContext } from "@/context/GeneralContext";
import { usePlaylistContext } from "@/context/PlaylistContext";

type PlaylistType = {
  id: string;
  title: string;
  description: string;
};

const MyMusic = () => {
  const { Playlists, IsNewPlaylistFormOpen, SetNewPlaylistFormOpen } =
    usePlaylistContext();
  const { SetAddToPlaylistFormOpen } = useGeneralContext();
  const router = useRouter();

  const AddPlaylist = () => {
    SetAddToPlaylistFormOpen(true);
    SetNewPlaylistFormOpen(true);
  };

  return (
    <div className=" w-full md:p-5 p-2 flex flex-wrap md:gap-10 gap-3 justify-around md:justify-start md:items-start	">
      <div
        className=" w-24 md:w-32 md:h-48 h-[120px] flex flex-col gap-y-1"
        onClick={() => router.push("/my-music/liked-song")}
      >
        <div className=" p-5 LikedSong w-24 md:w-32 h-24 md:h-32 transition-background bg-[#2219798c] hover:bg-[#4f43ba8c] flex justify-center items-center  rounded-xl">
          <Heart size={82} color="white" />
        </div>
        <span className=" text-xs md:text-sm Montserrat-regular w-full flex justify-center">
          Liked Songs
        </span>
      </div>
      <>
        {Playlists &&
          Object.entries(Playlists).map(([key, value]) => {
            return (
              <div
                className=" w-24 md:w-32 md:h-48 h-[120px] flex flex-col gap-y-1"
                key={key}
                onClick={() => router.push(`/my-music/playlist/${value.id}`)}
              >
                <div className=" p-5 LikedSong w-24 md:w-32 h-24 md:h-32 transition-background bg-[#e42121b9] hover:bg-[#ff5c5c] flex justify-center items-center rounded-xl">
                  <ListMusic size={82} color="white" className=" bg-" />
                </div>
                <span className=" text-xs md:text-sm Montserrat-regular w-full flex justify-center">
                  {value.title}
                </span>
              </div>
            );
          })}
      </>
      <div
        className=" w-24 md:w-32 md:h-48 h-[120px] flex flex-col gap-y-1"
        onClick={() => AddPlaylist()}
      >
        <div className=" p-5 LikedSong w-24 md:w-32 h-24 md:h-32 transition-background bg-[#e42121b9] hover:bg-[#ff5c5c] flex justify-center items-center rounded-xl">
          <Plus size={82} color="white" className=" bg-" />
        </div>
        <span className=" text-xs md:text-sm Montserrat-regular w-full flex justify-center">
          Add Playlist
        </span>
      </div>
      {IsNewPlaylistFormOpen ? <PlaylistForm /> : ""}
    </div>
  );
};

export default MyMusic;
