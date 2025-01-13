"use client";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import AudioPlayer from "@/components/audioplayer";
import { SidebarProvider } from "@/context/SidebarContext";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import { useGeneralContext } from "@/context/GeneralContext";
import { PlaylistContextProvider } from "@/context/PlaylistContext";
import { ChatContextProvider } from "@/context/ChatContext";
import { NotificationProvider } from "@/context/NotificationContext";
import CustomNavbar from "@/components/customNavbar";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { IsAddToPlaylistFormOpen, IsUploadPostFormOpen, NewMessage } =
    useGeneralContext();

  const divRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();

  const handleScroll = () => {
    if (divRef.current) {
      setIsAtTop(divRef.current.scrollTop === 0);
    }
  };

  const hideCustomNavbarRoutes = ["/notifications", "/feed", "/inbox"];
  const shouldShowCustomNavbar =
    !hideCustomNavbarRoutes.includes(pathname) && isAtTop;

  useEffect(() => {
    const refElement = divRef.current;
    if (refElement) {
      refElement.addEventListener("scroll", handleScroll);
      return () => {
        refElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div>
      {IsAddToPlaylistFormOpen || IsUploadPostFormOpen || NewMessage ? (
        <div className=" absolute w-full h-screen bg-[#25252550] z-[100]"></div>
      ) : (
        ""
      )}
      <Navbar />
      <ChatContextProvider>
        <AudioPlayerProvider>
          <SidebarProvider>
            <PlaylistContextProvider>
              <div className="w-full flex-col">
                <NotificationProvider>
                  <div className="MainContentDiv flex flex-row ">
                    <div className="flex flex-row z-[1000] h-full ">
                      <Sidebar />
                    </div>
                    <div className="MainSongsHomeContent md:w-full w-full  bg-black overflow-hidden mx-2 mb-2">
                      <div
                        className={`MainPageDivBox ${
                          isAtTop && shouldShowCustomNavbar
                            ? "MainPageDivBoxScroll"
                            : "MainPageDivBoxNotTop"
                        } text-white overflow-y-auto h-full rounded-lg overflow-x-hidden transition-all duration-1000 ease-in-out`}
                        ref={divRef}
                      >
                        {shouldShowCustomNavbar && (
                          <CustomNavbar visible={isAtTop} />
                        )}
                        {children}
                      </div>
                    </div>
                  </div>
                </NotificationProvider>
                <div>
                  <AudioPlayer />
                </div>
              </div>
            </PlaylistContextProvider>
          </SidebarProvider>
        </AudioPlayerProvider>
      </ChatContextProvider>
    </div>
  );
}
