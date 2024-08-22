"use client";
import { useRouter } from "next/navigation";
import { PiListLight } from "react-icons/pi";
import { MdHome } from "react-icons/md";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AlbumIcon from "@mui/icons-material/Album";
import { FaGuitar } from "react-icons/fa";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSidebar } from "@/context/SidebarContext";

const Sidebar = () => {
  const [musicCategory, setMusicCategory] = useState<number | null>(0);
  const { sideBarOpen, toggleSideBar } = useSidebar();
  const router = useRouter();

  const setCategory = (id: number) => {
    setMusicCategory(id);
  };

  return (
    <div
      className="bg-[#121212] w-[15rem] h-auto text-white rounded-lg my-2 ml-2"
      style={{ width: sideBarOpen ? "15rem" : "4rem" }}
    >
      <div className=" flex gap-4 h-16 items-center text-center justify-center">
        <div
          className=" cursor-pointer"
          style={{ paddingLeft: sideBarOpen ? "2px" : "" }}
        >
          <PiListLight size={24} onClick={() => toggleSideBar()} />
        </div>
        {sideBarOpen ? (
          <span onClick={() => router.push("/")} className=" ">
            <Image
              src="/LogoEchoVerse2.png"
              width={144}
              height={32}
              alt="Logo"
            />
          </span>
        ) : (
          ""
        )}
      </div>
      <div className=" p-2 w-full">
        <ul className=" flex flex-col gap-1">
          <li
            className="px-5 flex items-center hover:bg-[#49494988] rounded-md"
            style={{
              backgroundColor: musicCategory == 1 ? "#49494965" : "",
              justifyContent: sideBarOpen ? "" : "center",
            }}
            id="1"
            onClick={() => setCategory(1)}
          >
            <div className=" h-12 flex items-center gap-4 cursor-pointer">
              <MusicNoteIcon className=" rotate-12" />
              {sideBarOpen ? (
                <span className=" text-md lato-regular">Top Songs</span>
              ) : (
                ""
              )}
            </div>
          </li>
          <li
            className="px-5 flex items-center hover:bg-[#49494988] rounded-md"
            style={{
              backgroundColor: musicCategory == 2 ? "#49494965" : "",
              justifyContent: sideBarOpen ? "" : "center",
            }}
            id="2"
            onClick={() => setCategory(2)}
          >
            <div className=" h-12 flex items-center gap-4 cursor-pointer">
              <AlbumIcon className=" rotate-12" />
              {sideBarOpen ? (
                <span className=" text-md lato-regular">Top Albums</span>
              ) : (
                ""
              )}
            </div>
          </li>
          <li
            className="px-5 flex items-center hover:bg-[#49494988] rounded-md"
            style={{
              backgroundColor: musicCategory == 3 ? "#49494965" : "",
              justifyContent: sideBarOpen ? "" : "center",
            }}
            id="3"
            onClick={() => setCategory(3)}
          >
            <div className=" h-12 flex items-center gap-4 cursor-pointer">
              <div className=" w-[23px]">
                <FaGuitar size={20} color="#d6d6d6dc" />
              </div>
              {sideBarOpen ? (
                <span className=" text-md lato-regular">Top Artists</span>
              ) : (
                ""
              )}
            </div>
          </li>
          <li>
            <div className=" w-full">
              <Accordion
                type="single"
                value={musicCategory === 4 ? "Library" : ""}
                collapsible
              >
                <AccordionItem
                  value={"Library"}
                  className=" flex flex-col gap-1"
                >
                  <AccordionTrigger
                    className="h-12 flex items-center hover:bg-[#49494988] rounded-md "
                    style={{
                      backgroundColor: musicCategory === 4 ? "#49494965" : "",
                      width: sideBarOpen ? "14rem" : "4rem",
                      justifyContent: sideBarOpen ? "" : "center",
                      paddingLeft: sideBarOpen ? "18px" : "",
                      paddingRight: sideBarOpen ? "20px" : "",
                    }}
                    onClick={() => setCategory(4)}
                  >
                    <div className="h-12 flex items-center gap-4 cursor-pointer">
                      <div className=" w-[25px]">
                        <LibraryMusicIcon />
                      </div>
                      {sideBarOpen ? (
                        <div className="text-regular lato-regular text-white">
                          Library
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      className="h-12 rounded-md text-sm text-white bg-[#3939396f] flex flex-row items-center "
                      style={{
                        width: sideBarOpen ? "14rem" : "3rem",
                        justifyContent: sideBarOpen ? "" : "center",
                        paddingLeft: sideBarOpen ? "22px" : "",
                        paddingRight: sideBarOpen ? "20px" : "",
                      }}
                    >
                      <div className="flex items-center gap-4 cursor-pointer text-regular">
                        <div className=" w-[25px]">
                          <AiOutlineLike size={24} />
                        </div>
                        {sideBarOpen ? <span>Liked Songs</span> : ""}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </li>
          <li
            className="px-5 flex items-center hover:bg-[#49494988] rounded-md"
            style={{
              backgroundColor: musicCategory == 5 ? "#49494965" : "",
              justifyContent: sideBarOpen ? "" : "center",
            }}
            id="5"
            onClick={() => setCategory(5)}
          >
            <div className=" h-12 flex items-center gap-4 cursor-pointer">
              <div className=" w-[25px]">
                <BsFillChatLeftTextFill size={20} color="#d6d6d6dc" />
              </div>
              {sideBarOpen ? (
                <span className=" text-md lato-regular">Chat</span>
              ) : (
                ""
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
