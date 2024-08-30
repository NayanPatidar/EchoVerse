import { Music, LogOut, Settings, User, History } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdAccountCircle } from "react-icons/md";

export function DropdownMenuProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MdAccountCircle size={40} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-48 mr-5 right-5 bg-[#121212] text-white border-[#505050]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className=" bg-[#505050]" />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Music className="mr-2 h-4 w-4" />
            <span>Music</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <History className="mr-2 h-4 w-4" />
            <span>History</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className=" bg-[#505050]" />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
