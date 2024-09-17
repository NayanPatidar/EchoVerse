import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "@/lib/prisma";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY_API;

export async function POST(req: Request) {
  const data = await req.json();
  const { id, songArtistPrimary, songArtistSecondary, songImage, songName } =
    data;
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

      const likedSong = await prisma.likedSong.findFirst({
        where: {
          userId: userId,
          songId: id,
        },
      });

      if (likedSong) {
        await prisma.likedSong.deleteMany({
          where: {
            userId: userId,
            songId: id,
          },
        });

        return NextResponse.json(
          { message: "Song removed from liked songs" },
          { status: 200 }
        );
      } else {
        await prisma.likedSong.create({
          data: {
            user: {
              connect: { id: userId },
            },
            songId: id,
            songName: songName,
            songArtistPrimary: songArtistPrimary,
            songArtistSecondary: songArtistSecondary,
            songImage: songImage,
          },
        });

        return NextResponse.json(
          { message: "Song Added to the Liked Songs" },
          { status: 200 }
        );
      }
    }
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
}

export async function GET(req: Request) {
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

      const likedSongs = await prisma.likedSong.findMany({
        where: {
          userId: userId,
        },
        select: {
          songId: true,
          songArtistPrimary: true,
          songArtistSecondary: true,
          songName: true,
          songImage: true,
        },
      });

      return NextResponse.json({ data: likedSongs }, { status: 200 });
    }
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
}
