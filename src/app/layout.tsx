import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { AuthProvider } from "@/context/AuthContext";
import { GeneralContextProvider } from "@/context/GeneralContext";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "EchoVerse - Stream Music, Discover New Sounds",
    template: "%s | EchoVerse",
  },
  description:
    "Stream millions of songs, discover trending playlists, top albums, and your favorite artists on EchoVerse.",
  keywords: [
    "music streaming",
    "songs online",
    "playlists",
    "albums",
    "Hindi music",
    "Bollywood songs",
    "EchoVerse",
  ],
  authors: [{ name: "EchoVerse" }],
  openGraph: {
    type: "website",
    siteName: "EchoVerse",
    title: "EchoVerse - Stream Music, Discover New Sounds",
    description:
      "Stream millions of songs, discover trending playlists, top albums, and your favorite artists.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoVerse - Stream Music",
    description: "Your personal music streaming experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <GeneralContextProvider>
              <div className=" w-full h-full relative">{children}</div>
            </GeneralContextProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
