import {
  Keyboard,
  MoreVerticalIcon,
  Heart,
  ListPlus,
  Rows3,
  LetterText,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { useAuthProvider } from "@/context/AuthContext";
import { getImageURL } from "@/lib/utils";
import { DropupMenuAddToPlaylist } from "./AddToPlaylist";
import { useState } from "react";
import { useGeneralContext } from "@/context/GeneralContext";

export function DropupMenuAudioPlayer() {
  const { AudioFileLink, CurrentAudioIndex } = useAudioPlayer();
  const { SaveToPlaylist, SetSaveToPlaylist } = useGeneralContext();
  const { token } = useAuthProvider();

  const AddToLikedSong = async () => {
    if (!AudioFileLink || !token) {
      return;
    }

    try {
      const res = await fetch("/api/likedSong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
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

      const result = await res.json();
      console.log(result);
    } catch (error: any) {
      console.error("Got Error :", error.message);
    }
  };

  return (
    <DropdownMenu>
      {SaveToPlaylist ? <DropupMenuAddToPlaylist /> : ""}
      <DropdownMenuTrigger>
        <MoreVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-48 mb-8 mr-5 bg-[#1d1d1d] text-white border-[#333333]">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => AddToLikedSong()}>
            <Heart className="mr-2 h-4 w-4" />
            <span>Add to Liked Songs</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => SetSaveToPlaylist(true)}>
            <ListPlus className="mr-2 h-4 w-4" />
            <span>Add to Playlist</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Rows3 className="mr-2 h-4 w-4" />
            <span>Add to Queue</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LetterText className="mr-2 h-4 w-4" />
            <span>Lyrics</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
