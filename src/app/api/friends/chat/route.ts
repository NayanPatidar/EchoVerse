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
  const { friendId, relationId, message } = data;
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
      const res = await prisma.message.create({
        data: {
          friend: {
            connect: {
              id: relationId,
            },
          },
          senderId: userId,
          receiverId: friendId,
          content: message,
        },
      });

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
  const relationId = searchParams.get("relationId");
  const headers = request.headers.get("Authorization");

  console.log("Relation Id : " + relationId);

  if (!headers || !relationId) {
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
      const res = await prisma.message.findMany({
        where: { friendId: relationId as string },
      });

      return NextResponse.json({ res });
    }
  } catch (error: any) {
    console.error("Got Error In Searching Users : ", error.message);
  }
}
