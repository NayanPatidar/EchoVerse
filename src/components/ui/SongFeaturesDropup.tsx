import {
  Keyboard,
  MoreVerticalIcon,
  Heart,
  ListPlus,
  Rows3,
  LetterText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropupMenuAudioPlayer() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-48 mb-8 mr-5 bg-[#1d1d1d] text-white border-[#333333]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Heart className="mr-2 h-4 w-4" />
            <span>Add to Favorite</span>
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
