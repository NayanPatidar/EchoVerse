import { NextResponse } from "next/server";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { request } from "http";
import prisma from "@/lib/prisma";
import { defineDmmfProperty } from "@prisma/client/runtime/library";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY_API;

export async function POST(request: Request) {
  const data = await request.json();
  const { friendId, friendName } = data;
  const headers = request.headers.get("Authorization");

  if (!headers) {
    return NextResponse.json(
      {
        message: "Unauthorized: Token not provided",
      },
      { status: 401 }
    );
  }

  try {
    const token = headers?.split(" ")[1];
    const decoded = jwt.verify(token as string, SECRET_KEY as string);
    if (typeof decoded !== "string" && decoded && "userId" in decoded) {
      const userId = decoded.userId as string;
      const res = await prisma.chatFriends.create({
        data: {
          friendName: friendName,
          friendId: friendId,
          userId: userId,
        },
      });

      console.log("UserAdded");

      return NextResponse.json({ res });
    }
    return NextResponse.json({ message: "Error in sending request" });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get("searchTerm");
  const headers = request.headers.get("Authorization");

  if (!headers) {
    return NextResponse.json(
      {
        message: "Unauthorized: Token not provided",
      },
      { status: 401 }
    );
  }

  const token = headers?.split(" ")[1];
  const decoded = jwt.decode(token as string);

  try {
    if (typeof decoded !== "string" && decoded && "userId" in decoded) {
      const userId = decoded.userId as string;

      const res = await prisma.friends.findMany({
        where: {
          OR: [
            {
              user1Name: {
                startsWith: userName as string,
                mode: "insensitive",
              },
            },
            {
              user2Name: {
                startsWith: userName as string,
                mode: "insensitive",
              },
            },
          ],
        },
      });

      const friends = res
        .map((friend) => {
          if (friend.user1Id === userId) {
            return { friendId: friend.user2Id, friendName: friend.user2Name };
          } else if (friend.user2Id === userId) {
            return { friendId: friend.user1Id, friendName: friend.user1Name };
          }
          return null;
        })
        .filter(Boolean);

      console.log(friends);

      return NextResponse.json({ friends });
    }
  } catch (error: any) {
    console.error("Got Error In Searching Users : ", error.message);
  }
}
