"use client";
import { PiListLight } from "react-icons/pi";
import { MdHomeFilled } from "react-icons/md";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { BsChatLeftDots } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className=" bg-black w-[15rem] h-screen text-white border-r-[1px] border-zinc-800">
      <div className=" flex gap-6 h-16 items-center text-center justify-center">
        <PiListLight size={24} />
        <span>
          <img src="./LogoVerse.png" className=" w-36" />
        </span>
      </div>
      <div className=" p-2">
        <ul>
          <li className="px-5 flex items-center hover:bg-zinc-700 rounded-md">
            <div className=" h-12 flex items-center gap-5 ">
              <MdHomeFilled size={24} color="white" />
              <div className=" text-md lato-regular">Home</div>
            </div>
          </li>
          <li className="px-5 flex items-center hover:bg-zinc-700 rounded-md">
            <div className=" h-12 flex items-center gap-5">
              <MdOutlineLibraryMusic size={24} />
              <div className=" text-md lato-regular">Library</div>
            </div>
          </li>
          <li className="px-5 flex items-center hover:bg-zinc-700 rounded-md">
            <div className=" h-12 flex items-center gap-5">
              <BsChatLeftDots size={20} color="white" />
              <div className=" text-md lato-regular">Chat</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
