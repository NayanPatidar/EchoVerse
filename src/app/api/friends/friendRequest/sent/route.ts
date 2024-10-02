import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "@/lib/prisma";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY_API;

export async function POST(request: Request) {
  const data = await request.json();
  const { receiverId, senderId } = data;
  const headers = request.headers.get("Authorization");
  console.log("Reciever ID : " + receiverId);
  console.log("Sender ID : " + senderId);

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
      const res = await prisma.friendRequest.create({
        data: {
          senderId: senderId,
          receiverId: receiverId,
          status: "PENDING",
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
