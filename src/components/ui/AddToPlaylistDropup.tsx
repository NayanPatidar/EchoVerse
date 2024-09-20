"use client";
import { MoreVerticalIcon, LetterText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useAuthProvider } from "@/context/AuthContext";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { getImageURL } from "@/lib/utils";
import { usePlaylistContext } from "@/context/PlaylistContext";

export function DropupMenuAddToPlaylist() {
  const { token } = useAuthProvider();
  const { Playlists, SetIsAddToPlaylistDropupOpen } = usePlaylistContext();
  const { AudioFileLink, CurrentAudioIndex } = useAudioPlayer();

  const AddSongToPlaylist = async (playlistId: string) => {
    SetIsAddToPlaylistDropupOpen(false);
    if (!AudioFileLink) {
      return;
    }

    try {
      const res = await fetch("/api/playlistSong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          playlistId: playlistId,
          id: AudioFileLink[CurrentAudioIndex].id,
          songArtistPrimary:
            AudioFileLink[CurrentAudioIndex].artist_map.artists[0].name,
          songArtistSecondary: AudioFileLink[CurrentAudioIndex].artist_map
            .artists[1]
            ? AudioFileLink[CurrentAudioIndex].artist_map.artists[1]?.name
            : "-",
          songImage: getImageURL(AudioFileLink[CurrentAudioIndex]?.image),
          songName: AudioFileLink[CurrentAudioIndex]?.name,
        }),
      });

      if (res) {
        const data = await res.json();
        console.log("Song Added to the Playlist Successfully : ", data);
      }
    } catch (error: any) {
      console.error("Error In Adding Song the Playlist :", error.message);
    }
  };

  return (
    <DropdownMenu open={true}>
      <DropdownMenuTrigger></DropdownMenuTrigger>
      <DropdownMenuContent className=" w-48 h-48 mb-16 mr-5 bg-[#1d1d1d] text-white border-[#333333]">
        <DropdownMenuGroup>
          <span className=" font-semibold text-sm w-full text-center flex justify-center items-center py-2">
            Add to Playlist
          </span>
          {Playlists &&
            Object.entries(Playlists).map(([key, val]) => {
              return (
                <DropdownMenuItem onClick={() => AddSongToPlaylist(val.id)}>
                  <LetterText className="mr-2 h-4 w-4" />
                  <span>{val.title}</span>
                </DropdownMenuItem>
              );
            })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
