"use client";
import { useRouter } from "next/navigation";
import { PiListLight } from "react-icons/pi";
import { MdHome } from "react-icons/md";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Image from "next/image";


const Sidebar= () => {
  const [musicCategory, setMusicCategory] = useState<number | null>(1);
  const router = useRouter();

  const setCategory = (id: number) => {
    setMusicCategory(id);
  };

  return (
    <div className=" bg-[#121212] w-[15rem] h-auto text-white rounded-lg my-2 ml-2">
      <div className=" flex gap-6 h-16 items-center text-center justify-center">
        <div>
          <PiListLight size={24} />
        </div>
        <span onClick={() => router.push("/")}>
          <Image src="/LogoEchoVerse2.png" width={144} height={32} alt="Logo" />
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
              <MdHome size={24} color="#d6d6d6dc" />
              <div className=" text-md lato-regular">Home</div>
            </div>
          </li>
          <li
            className="px-5 flex items-center hover:bg-[#49494988] rounded-md"
            style={{ backgroundColor: musicCategory == 2 ? "#49494965" : "" }}
            id="2"
            onClick={() => setCategory(2)}
          >
            <div className=" h-12 flex items-center gap-5 cursor-pointer">
              <MdOutlineLibraryMusic size={24} color="#d6d6d6dc" />
              <div className=" text-md lato-regular">Library</div>
            </div>
          </li>
          <li
            className="px-5 flex items-center hover:bg-[#49494988] rounded-md"
            style={{ backgroundColor: musicCategory == 3 ? "#49494965" : "" }}
            id="3"
            onClick={() => setCategory(3)}
          >
            <div className=" h-12 flex items-center gap-5 cursor-pointer pl-1">
              <BsFillChatLeftTextFill size={20} color="#d6d6d6dc" />
              <div className=" text-md lato-regular">Chat</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
