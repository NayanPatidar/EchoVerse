import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import AudioPlayer from "@/components/audioplayer";
import { SidebarProvider } from "@/context/SidebarContext";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <SidebarProvider>
          <div className="w-full flex-col">
            <div className="MainContentDiv flex flex-row ">
              <div className="flex flex-row z-0">
                <Sidebar />
              </div>
              <div className="MainSongsHomeContent w-auto bg-black overflow-hidden m-2 mb-2">
                <div className="MainPageDivBox relative text-white overflow-y-auto h-full rounded-lg overflow-x-hidden">
                  <Navbar />
                  {children}
                </div>
              </div>
            </div>
            <div>
              <AudioPlayer />
            </div>
          </div>
        </SidebarProvider>
    </div>
  );
}

{
}
