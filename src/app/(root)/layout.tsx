"use client";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import AudioPlayer from "@/components/audioplayer";
import { SidebarProvider } from "@/context/SidebarContext";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import { useGeneralContext } from "@/context/GeneralContext";
import { PlaylistContextProvider } from "@/context/PlaylistContext";
import { ChatContextProvider } from "@/context/ChatContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { IsAddToPlaylistFormOpen, IsUploadPostFormOpen } = useGeneralContext();

  return (
    <div>
      {IsAddToPlaylistFormOpen || IsUploadPostFormOpen ? (
        <div className=" absolute w-full h-screen bg-[#25252550] z-[100]"></div>
      ) : (
        ""
      )}
      <ChatContextProvider>
        <AudioPlayerProvider>
          <SidebarProvider>
            <PlaylistContextProvider>
              <div className="w-full flex-col">
                <div className="MainContentDiv flex flex-row ">
                  <div className="flex flex-row z-0">
                    <Sidebar />
                  </div>
                  <div className="MainSongsHomeContent w-auto bg-black overflow-hidden m-2 mb-2">
                    <div className="MainPageDivBox text-white overflow-y-auto h-full rounded-lg overflow-x-hidden">
                      <Navbar />
                      {children}
                    </div>
                  </div>
                </div>
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
