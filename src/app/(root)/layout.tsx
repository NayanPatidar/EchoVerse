"use client";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import AudioPlayer from "@/components/audioplayer";
import { useGeneralContext } from "@/context/GeneralContext";
import { PlaylistContextProvider } from "@/context/PlaylistContext";
import { ChatContextProvider } from "@/context/ChatContext";
import CustomNavbar from "@/components/customNavbar";
import { useSidebar } from "@/context/SidebarContext";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { IsAddToPlaylistFormOpen, IsUploadPostFormOpen, NewMessage } =
    useGeneralContext();
  const { sideBarOpen, toggleSideBar } = useSidebar();

  const divRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();

  const handleScroll = () => {
    if (divRef.current) {
      setIsAtTop(divRef.current.scrollTop === 0);
    }
  };

  const hideCustomNavbarRoutes = ["/notifications", "/feed", "/inbox", "/settings"];
  const shouldShowCustomNavbar = !hideCustomNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Auto-close sidebar on mobile when navigating to a new route
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768 && sideBarOpen) {
      toggleSideBar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const refElement = divRef.current;
    if (refElement) {
      refElement.addEventListener("scroll", handleScroll);
      return () => refElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <ChatContextProvider>
      <PlaylistContextProvider>
        <div>
          {(IsAddToPlaylistFormOpen || IsUploadPostFormOpen || NewMessage) && (
            <div className="absolute w-full h-screen bg-[#25252550] z-[100]" />
          )}

          {/* Mobile sidebar backdrop — tap outside to close */}
          {sideBarOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-[55] md:hidden"
              onClick={toggleSideBar}
            />
          )}

          <Navbar />

          <div className="w-full flex-col">
            <div className="MainContentDiv flex flex-row">
              <div className="flex flex-row z-[60] h-full">
                <Sidebar />
              </div>
              <div className="MainSongsHomeContent md:w-full w-full bg-[#121212] overflow-hidden mx-1 md:mx-2 mb-1 md:mb-2">
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
            <div>
              <AudioPlayer />
            </div>
          </div>
        </div>
      </PlaylistContextProvider>
    </ChatContextProvider>
  );
}
