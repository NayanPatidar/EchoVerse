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
import { useState } from "react";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { useAuthProvider } from "@/context/AuthContext";
import { useSession } from "next-auth/react";

export function DropupMenuAudioPlayer() {
  const { AudioFileLink, CurrentAudioIndex } = useAudioPlayer();
  const { token } = useAuthProvider();
  const { session } = useAuthProvider();

  const AddToLikedSong = async () => {
    if (!AudioFileLink || !token) {
      return;
    }

    console.log(AudioFileLink[CurrentAudioIndex]);

    try {
      const res = await fetch("/api/AddLikedSong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: AudioFileLink[CurrentAudioIndex].id }),
      });

      const result = await res.json();
      console.log(result);
    } catch (error: any) {
      console.error("Got Error :", error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-48 mb-8 mr-5 bg-[#1d1d1d] text-white border-[#333333]">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => AddToLikedSong()}>
            <Heart className="mr-2 h-4 w-4" />
            <span>Add to Liked Songs</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
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
