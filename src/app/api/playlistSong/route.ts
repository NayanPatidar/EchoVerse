import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "@/lib/prisma";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY_API;

export async function POST(req: Request) {
  const data = await req.json();
  const {
    playlistId,
    id,
    songArtistPrimary,
    songArtistSecondary,
    songImage,
    songName,
  } = data;
  const token = req.headers.get("Authorization");

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized: Token not provided",
      },
      { status: 401 }
    );
  }

  try {
    const splittedToken = token.split(" ")[1];
    const decoded = jwt.verify(splittedToken, SECRET_KEY as string);

    if (typeof decoded !== "string" && decoded && "userId" in decoded) {
      const userId = decoded.userId as string;

      const PlaylistSong = await prisma.playlistSong.findMany({
        where: {
          playlistId: playlistId,
          songId: id,
        },
      });

      console.log("Type of Playlist Song : " + typeof PlaylistSong);

      if (Object.entries(PlaylistSong).length != 0) {
        await prisma.playlistSong.deleteMany({
          where: {
            playlistId: playlistId,
            songId: id,
          },
        });

        return NextResponse.json(
          { message: "Song removed from Playlist" },
          { status: 200 }
        );
      } else {
        await prisma.playlistSong.create({
          data: {
            playlistId: playlistId,
            songId: id,
            songName: songName,
            songArtistPrimary: songArtistPrimary,
            songArtistSecondary: songArtistSecondary,
            songImage: songImage,
          },
        });

        return NextResponse.json(
          { message: "Song Added to the Playlist" },
          { status: 200 }
        );
      }
    }
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Error : " + error.message },
      { status: 401 }
    );
  }
}

export async function GET(req: Request) {
  const token = req.headers.get("Authorization");
  const playlistId = req.headers.get("PlaylistId");

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized: Token not provided",
      },
      { status: 401 }
    );
  }

  if (!playlistId) {
    return NextResponse.json(
      {
        message: "Playlist ID not provided !",
      },
      { status: 401 }
    );
  }

  try {
    const splittedToken = token.split(" ")[1];
    const decoded = jwt.verify(splittedToken, SECRET_KEY as string);

    if (typeof decoded !== "string" && decoded && "userId" in decoded) {
      const userId = decoded.userId as string;

      const PlaylistSongs = await prisma.playlistSong.findMany({
        where: {
          playlistId: playlistId,
          Playlist: {
            userId: userId,
          },
        },
        select: {
          songId: true,
          songArtistPrimary: true,
          songArtistSecondary: true,
          songName: true,
          songImage: true,
        },
      });

      return NextResponse.json({ data: PlaylistSongs }, { status: 200 });
    }
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
}
