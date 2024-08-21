"use client";
import { useRouter } from "next/navigation";
import { PiListLight } from "react-icons/pi";
import { MdHome } from "react-icons/md";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar = () => {
  const [musicCategory, setMusicCategory] = useState<number | null>(0);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const router = useRouter();

  const setCategory = (id: number) => {
    setMusicCategory(id);
  };

  return (
    <div
      className="bg-[#121212] w-[15rem] h-auto text-white rounded-lg my-2 ml-2"
      style={{ width: sideBarOpen ? "15rem" : "4rem" }}
    >
      <div className=" flex gap-6 h-16 items-center text-center justify-center">
        <div
          className=" cursor-pointer"
          style={{ paddingLeft: sideBarOpen ? "12px" : "" }}
        >
          <PiListLight size={24} onClick={() => setSideBarOpen(!sideBarOpen)} />
        </div>
        {sideBarOpen ? (
          <span onClick={() => router.push("/")}>
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
        <ul className=" flex flex-col gap-2">
          <li>
            <div className=" w-full">
              <Accordion
                type="single"
                value={musicCategory === 1 ? "Library" : ""}
                collapsible
              >
                <AccordionItem
                  value={"Library"}
                  className=" flex flex-col gap-1"
                >
                  <AccordionTrigger
                    className="h-12 flex items-center hover:bg-[#49494988] rounded-md "
                    style={{
                      backgroundColor: musicCategory === 1 ? "#49494965" : "",
                      width: sideBarOpen ? "14rem" : "4rem",
                      justifyContent: sideBarOpen ? "" : "center",
                      paddingLeft: sideBarOpen ? "22px" : "",
                      paddingRight: sideBarOpen ? "20px" : "",
                    }}
                    onClick={() => setCategory(1)}
                  >
                    <div className="h-12 flex items-center gap-4 cursor-pointer">
                      <MdOutlineLibraryMusic size={24} color="#d6d6d6dc" />
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
                      className="h-12 rounded-md text-sm text-white bg-[#3939396f] flex flex-row items-center"
                      style={{
                        width: sideBarOpen ? "14rem" : "3rem",
                        justifyContent: sideBarOpen ? "" : "center",
                        paddingLeft: sideBarOpen ? "22px" : "",
                        paddingRight: sideBarOpen ? "20px" : "",
                      }}
                    >
                      <div className="flex items-center gap-4 cursor-pointer text-regular">
                        <AiOutlineLike size={24} />
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
              backgroundColor: musicCategory == 3 ? "#49494965" : "",
              justifyContent: sideBarOpen ? "" : "center",
            }}
            id="3"
            onClick={() => setCategory(3)}
          >
            <div className=" h-12 flex items-center gap-5 cursor-pointer pl-1">
              <BsFillChatLeftTextFill size={20} color="#d6d6d6dc" />
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
