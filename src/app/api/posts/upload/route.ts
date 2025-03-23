import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "@/lib/prisma";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY_API;

export async function POST(req: Request) {
  const data = await req.json();
  const {
    Description,
    AudioStartTime,
    AudioEndTime,
    ImageDownloadLink,
    Location,
    AudioLink,
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

      const newPost = await prisma.post.create({
        data: {
          userId,
          description: Description,
          audioStartTime: AudioStartTime,
          audioEndTime: AudioEndTime,
          location: Location,
          audioLink: AudioLink,
          fileDownloadLink: ImageDownloadLink,
        },
      });

      console.log("Post created successfully:", newPost);

      return NextResponse.json(
        { message: "Post Upload To DB" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Error : " + error.message },
      { status: 401 }
    );
  }
}
