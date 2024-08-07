import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { Slider } from "@mui/material";
import AudioPlayer from "@/components/audioplayer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        /> 
      </head>
      <body className={inter.className}>
        <div className="w-full flex-col">
          <div className="MainContentDiv flex flex-row ">
            <div className="flex flex-row h-">
              <Sidebar />
            </div>
            <div className="MainSongsHomeContent w-auto bg-black overflow-hidden m-2 mb-2">
              {children}
            </div>
          </div>
          <div>
            <AudioPlayer />
          </div>
        </div>
        {/* <AudioPlayer /> */}
      </body>
    </html>
  );
}
