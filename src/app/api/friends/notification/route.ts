import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "@/lib/prisma";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY_API;

export async function POST(request: Request) {
  const data = await request.json();
  const { type, senderId, receiverId, name } = data;
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
      const res = await prisma.notification.create({
        data: {
          senderId: senderId,
          recevierId: receiverId,
          content: `${name} started following you!`,
          type: type,
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
