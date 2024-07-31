"use client";
import { PiListLight } from "react-icons/pi";
import { MdHomeFilled } from "react-icons/md";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { BsChatLeftDots } from "react-icons/bs";
import { MouseEvent, useEffect, useState } from "react";

const Sidebar = () => {
  const [musicCategory, setMusicCategory] = useState<number | null>(1);

  const setCategory = (id: number) => {
    console.log(id);
    setMusicCategory(id);
  };

  useEffect(() => {}, []);

  return (
    <div className=" bg-black w-[15rem] h-screen text-white border-r-[1px] border-zinc-800">
      <div className=" flex gap-6 h-16 items-center text-center justify-center">
        <div>
          <PiListLight size={24} />
        </div>
        <span>
          <img src="./LogoEchoVerse2.png" className=" w-36" />
        </span>
      </div>
      <div className=" p-2">
        <ul>
          <li
            className="px-5 flex items-center hover:bg-[#49494988] rounded-md"
            style={{ backgroundColor: musicCategory == 1 ? "#49494965" : "" }}
            id="1"
            onClick={() => setCategory(1)}
          >
            <div className=" h-12 flex items-center gap-5 cursor-pointer">
              <MdHomeFilled size={24} color="white" />
              <div className=" text-lg lato-regular">Home</div>
            </div>
          </li>
          <li
            className="px-5 flex items-center hover:bg-[#49494988] rounded-md"
            style={{ backgroundColor: musicCategory == 2 ? "#49494965" : "" }}
            id="2"
            onClick={() => setCategory(2)}
          >
            <div className=" h-12 flex items-center gap-5 cursor-pointer">
              <MdOutlineLibraryMusic size={24} />
              <div className=" text-lg lato-regular">Library</div>
            </div>
          </li>
          <li
            className="px-5 flex items-center hover:bg-[#49494988] rounded-md"
            style={{ backgroundColor: musicCategory == 3 ? "#49494965" : "" }}
            id="3"
            onClick={() => setCategory(3)}
          >
            <div className=" h-12 flex items-center gap-5 cursor-pointer">
              <BsChatLeftDots size={20} color="white" />
              <div className=" text-lg lato-regular">Chat</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
