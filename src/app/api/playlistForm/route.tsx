import { NextResponse } from "next/server";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY_API;

export async function POST(request: Request) {
  const data = await request.json();
  const { title, description } = data;
  let token = request.headers.get("Authorization");

  if (!token) {
    token = "";
  }

  try {
    const splittedToken = token.split(" ")[1];
    const decoded = jwt.verify(splittedToken, SECRET_KEY as string);

    if (typeof decoded !== "string" && decoded && "userId" in decoded) {
      const userId = decoded.userId as string;

      await prisma.playlist.create({
        data: {
          user: {
            connect: { id: userId },
          },
          title: title,
          description: description,
        },
      });

      return NextResponse.json(
        {
          message: "Playlist Created Successfully",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Got Error In Playlist Form : ", error.message);
  }
}

export async function GET(request: Request) {
  const token = request.headers.get("Authorization");

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

      const playlists = await prisma.playlist.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          title: true,
          description: true,
        },
      });

      return NextResponse.json(
        {
          data: playlists,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Got Error In Playlist Form : ", error.message);
  }
}
