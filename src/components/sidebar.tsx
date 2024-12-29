"use client";
import { useRouter } from "next/navigation";
import { PiListLight } from "react-icons/pi";
import { MdHome } from "react-icons/md";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AlbumIcon from "@mui/icons-material/Album";
import { FaGuitar } from "react-icons/fa";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSidebar } from "@/context/SidebarContext";
import {
  Heart,
  LayoutPanelLeft,
  MessageCircleHeart,
  MessagesSquare,
  Music,
  Search,
} from "lucide-react";

const Sidebar = () => {
  const [musicCategory, setMusicCategory] = useState<number | null>(0);
  const { sideBarOpen, toggleSideBar } = useSidebar();
  const router = useRouter();

  const setCategory = (id: number) => {
    setMusicCategory(id);
    if (id == 1) {
      router.push("/playlist");
    } else if (id == 2) {
      router.push("/album");
    } else if (id == 3) {
      router.push("/artist");
    }
  };

  return (
    <div
      className={`SidebarMain bg-[#0e0e0e]  text-white rounded-lg mb-2 ml-2 z-[1000] 
                 transition-all duration-300 ease-in-out 
                 md:relative absolute top-0 left-0  
                 ${sideBarOpen ? "md:w-[15rem] w-[12rem]" : "sm:w-[4rem] w-0"} 
                 ${sideBarOpen ? "block" : "hidden md:block"} `}
      style={{ height: "calc(100% - 0.5rem)", overflowY: "auto" }}
    >
      {/* <div className=" flex md:gap-4 gap-1 h-12 items-center text-center md:justify-center justify-start md:pt-0 pt-2 md:pl-0 pl-[6px]">
        <div
          className=" cursor-pointer"
          style={{ paddingLeft: sideBarOpen ? "2px" : "" }}
        >
          <PiListLight size={24} onClick={() => toggleSideBar()} />
        </div>
        {sideBarOpen ? (
          <span onClick={() => router.push("/")} className=" ">
            <Image
              src="/EchoverseLogoFinal.png"
              width={144}
              height={32}
              alt="Logo"
              className="md:w-[144px] md:h-[32px] w-[120px] h-[25px]"
            />
          </span>
        ) : (
          ""
        )}
      </div> */}
      <Accordion type="multiple" defaultValue={["Music", "Share"]}>
        <AccordionItem
          value="Music"
          className=" flex flex-col w-full justify-center md:mt-0 md:p-0 p-2"
        >
          <div className=" w-full flex justify-center items-center mt-2 md:mt-4 px-2">
            <div
              className="h-10 flex flex-row w-full items-center justify-items-center hover:bg-[#171717b3] rounded-md "
              style={{
                backgroundColor: "#1a1a1ab3",
                width: sideBarOpen ? "14rem" : "4rem",
                justifyContent: sideBarOpen ? "" : "center",
                paddingLeft: sideBarOpen ? "18px" : "",
                paddingRight: sideBarOpen ? "20px" : "",
              }}
            >
              <div
                className=" flex flex-row gap-3 items-center w-full"
                style={{
                  justifyContent: sideBarOpen ? "" : "center",
                  paddingLeft: sideBarOpen ? "1.75rem" : "",
                  paddingRight: sideBarOpen ? "1.75rem" : "",
                }}
              >
                <Music
                  color="#9c9c9c88"
                  className=" md:size-[20px] size-[16px]"
                />

                {sideBarOpen ? (
                  <h2 className="gradientText font-bold md:text-xl text-base ">
                    Music
                  </h2>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <AccordionContent className=" p-0">
            <div className=" md:p-2 p-1 w-full">
              <ul className=" flex flex-col gap-1">
                <li
                  className="px-5 flex items-center hover:bg-[#262626d6] rounded-md"
                  style={{
                    backgroundColor: musicCategory == 1 ? "#2626267c" : "",
                    justifyContent: sideBarOpen ? "" : "center",
                  }}
                  id="1"
                  onClick={() => setCategory(1)}
                >
                  <div
                    className=" md:h-10 h-8 flex items-center gap-4 cursor-pointer"
                    onClick={() => router.push("/playlist")}
                  >
                    <QueueMusicIcon
                      width={24}
                      className=" md:w-[24px] w-[18px]"
                    />
                    {sideBarOpen ? (
                      <span className=" md:text-sm text-sm lato-regular">
                        Top Playlists
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
                <li
                  className="px-5 flex items-center hover:bg-[#262626d6] rounded-md"
                  style={{
                    backgroundColor: musicCategory == 2 ? "#2626267c" : "",
                    justifyContent: sideBarOpen ? "" : "center",
                  }}
                  id="2"
                  onClick={() => setCategory(2)}
                >
                  <div className=" md:h-10 h-8 flex items-center gap-4 cursor-pointer">
                    <AlbumIcon
                      className=" rotate-12  md:w-[24px] w-[18px]"
                      width={24}
                    />
                    {sideBarOpen ? (
                      <span className=" text-md lato-regular">Top Albums</span>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
                <li
                  className="px-5 flex items-center hover:bg-[#262626d6] rounded-md"
                  style={{
                    backgroundColor: musicCategory == 3 ? "#2626267c" : "",
                    justifyContent: sideBarOpen ? "" : "center",
                  }}
                  id="3"
                  onClick={() => setCategory(3)}
                >
                  <div
                    className=" md:h-10 h-8 flex items-center gap-4 cursor-pointer"
                    onClick={() => router.push("/artist")}
                  >
                    <div className=" w-[21px] md:w-[23px]">
                      <FaGuitar
                        size={20}
                        color="#d6d6d6dc"
                        className=" md:w-[20px] w-[18px]"
                      />
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
                          className="h-10 flex items-center hover:bg-[#262626d6] rounded-md "
                          style={{
                            backgroundColor:
                              musicCategory === 4 ? "#2626267c" : "",
                            width: sideBarOpen ? "14rem" : "4rem",
                            justifyContent: sideBarOpen ? "" : "center",
                            paddingLeft: sideBarOpen ? "18px" : "",
                            paddingRight: sideBarOpen ? "20px" : "",
                          }}
                          onClick={() => setCategory(4)}
                        >
                          <div
                            className="h-10 flex items-center gap-4 cursor-pointer"
                            onClick={() => router.push("/my-music")}
                          >
                            <div className=" w-[25px]">
                              <LibraryMusicIcon
                                width={24}
                                className=" md:w-[24px] w-[18px]"
                              />
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
                        <AccordionContent className=" p-0">
                          <div
                            className="h-10 rounded-md text-sm text-white bg-[#3939396f] flex flex-row items-center "
                            style={{
                              width: sideBarOpen ? "14rem" : "3rem",
                              justifyContent: sideBarOpen ? "" : "center",
                              paddingLeft: sideBarOpen ? "20px" : "",
                              paddingRight: sideBarOpen ? "20px" : "",
                            }}
                            onClick={() => router.push("/my-music/liked-song")}
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
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="Share"
          className=" flex flex-col w-full justify-center md:mt-0 md:p-0 p-2"
        >
          <div className=" w-full flex justify-center px-2">
            <div
              className="h-10 flex flex-row w-full items-center justify-items-center hover:bg-[#313131d6] rounded-md "
              style={{
                backgroundColor: "#1a1a1ab3",
                width: sideBarOpen ? "14rem" : "4rem",
                justifyContent: sideBarOpen ? "" : "center",
                paddingLeft: sideBarOpen ? "18px" : "",
                paddingRight: sideBarOpen ? "20px" : "",
              }}
            >
              <div
                className="flex flex-row gap-3 items-center w-full"
                style={{
                  justifyContent: sideBarOpen ? "" : "center",
                  paddingLeft: sideBarOpen ? "1.75rem" : "",
                  paddingRight: sideBarOpen ? "1.75rem" : "",
                }}
              >
                <MessageCircleHeart
                  size={20}
                  color="#9c9c9c88"
                  className=" md:size-[20px] size-[16px]"
                />
                {sideBarOpen ? (
                  <h2 className="gradientText font-bold md:text-xl text-base ">
                    Share
                  </h2>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <AccordionContent>
            <div className=" p-2 w-full mb-[-24px]">
              <ul className=" flex flex-col gap-1">
                <li
                  className="px-5 flex items-center hover:bg-[#262626d6] rounded-md"
                  style={{
                    backgroundColor: musicCategory == 5 ? "#2626267c" : "",
                    justifyContent: sideBarOpen ? "" : "center",
                  }}
                  id="1"
                  onClick={() => {
                    setCategory(5), router.push("/feed");
                  }}
                >
                  <div className=" md:h-10 h-8 flex items-center gap-4 cursor-pointer">
                    <LayoutPanelLeft
                      width={24}
                      className=" md:w-[24px] w-[18px]"
                    />
                    {sideBarOpen ? (
                      <span className=" text-md lato-regular">Feed</span>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
                <li
                  className="px-5 sm:hidden flex items-center hover:bg-[#262626d6] rounded-md "
                  style={{
                    backgroundColor: musicCategory == 6 ? "#2626267c" : "",
                    justifyContent: sideBarOpen ? "" : "center",
                  }}
                  id="1"
                  onClick={() => {
                    setCategory(6), router.push("/search");
                  }}
                >
                  <div className=" md:h-10 h-8 flex items-center gap-4 cursor-pointer">
                    <Search width={24} className=" md:w-[24px] w-[18px]" />
                    {sideBarOpen ? (
                      <span className=" text-md lato-regular">Search</span>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
                <li
                  className="px-5 flex items-center hover:bg-[#262626d6] rounded-md"
                  style={{
                    backgroundColor: musicCategory == 7 ? "#2626267c" : "",
                    justifyContent: sideBarOpen ? "" : "center",
                  }}
                  id="1"
                  onClick={() => setCategory(7)}
                >
                  <div
                    className=" md:h-10 h-8 flex items-center gap-4 cursor-pointer"
                    onClick={() => router.push("/inbox")}
                  >
                    <MessagesSquare
                      width={24}
                      className=" md:w-[24px] w-[18px]"
                    />
                    {sideBarOpen ? (
                      <span className=" text-md lato-regular">Messages</span>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
                <li
                  className="px-5 flex items-center hover:bg-[#262626d6] rounded-md"
                  style={{
                    backgroundColor: musicCategory == 8 ? "#2626267c" : "",
                    justifyContent: sideBarOpen ? "" : "center",
                  }}
                  id="1"
                  onClick={() => setCategory(8)}
                >
                  <div
                    className=" md:h-10 h-8 flex items-center gap-4 cursor-pointer"
                    onClick={() => router.push("/notifications")}
                  >
                    <Heart width={24} className=" md:w-[24px] w-[18px]" />
                    {sideBarOpen ? (
                      <span className=" text-md lato-regular">
                        Notifications
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;
