"use client";
import { useAuthProvider } from "@/context/AuthContext";
import { Heart, ListMusic, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { PlaylistForm } from "@/components/ui/NewPlaylistForm";
import { useRouter } from "next/navigation";
import { useGeneralContext } from "@/context/GeneralContext";

type PlaylistType = {
  id: string;
  title: string;
  description: string;
};

const MyMusic = () => {
  const { token } = useAuthProvider();
  const [LikedSongData, SetLikedSongsData] = useState(null);
  const [NewPlaylistFormOpen, SetNewPlaylistFormOpen] = useState(false);
  const { open, setOpen } = useGeneralContext();
  const [Playlists, SetPlaylist] = useState<PlaylistType[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      return;
    }
    const FetchPlaylists = async () => {
      const res = await fetch("/api/playlistForm", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const message = await res.json();

      SetPlaylist(message.data);
      console.log(message.data);
    };

    FetchPlaylists();
  }, [token]);

  const AddPlaylist = () => {
    setOpen(true);
    SetNewPlaylistFormOpen(true);
  };

  return (
    <div className=" w-full p-5 grid grid-cols-5	">
      <div
        className=" w-32 h-48 flex flex-col gap-y-1"
        onClick={() => router.push("/my-music/liked-song")}
      >
        <div className=" p-5 LikedSong w-32 h-32 transition-background bg-[#2219798c] hover:bg-[#4f43ba8c] flex justify-center items-center  rounded-xl">
          <Heart size={82} color="white" />
        </div>
        <span className=" text-sm Montserrat-regular w-full flex justify-center">
          Liked Songs
        </span>
      </div>
      <>
        {Playlists &&
          Object.entries(Playlists).map(([key, value]) => {
            return (
              <div className=" w-32 h-48 flex flex-col gap-y-1" key={key}>
                <div className=" p-5 LikedSong w-32 h-32 transition-background bg-[#e42121b9] hover:bg-[#ff5c5c] flex justify-center items-center  rounded-xl">
                  <ListMusic size={82} color="white" className=" bg-" />
                </div>
                <span className=" text-sm Montserrat-regular w-full flex justify-center">
                  {value.title}
                </span>
              </div>
            );
          })}
      </>
      <div
        className=" w-32 h-48 flex flex-col gap-y-1"
        onClick={() => AddPlaylist()}
      >
        <div className=" p-5 LikedSong w-32 h-32 transition-background bg-[#4545458c] hover:bg-[#a9a9a98c] flex justify-center items-center  rounded-xl">
          <Plus size={82} color="white" className=" bg-" />
        </div>
        <span className=" text-sm Montserrat-regular w-full flex justify-center">
          Add Playlist
        </span>
      </div>
      {NewPlaylistFormOpen ? (
        <PlaylistForm setOpenState={SetNewPlaylistFormOpen} />
      ) : (
        ""
      )}
    </div>
  );
};

export default MyMusic;
