import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "@/lib/prisma";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY_API;

export async function GET(request: Request) {
  const headers = request.headers.get("Authorization");

  if (!headers) {
    return NextResponse.json(
      { message: "Unauthorized: Token not provided" },
      { status: 401 }
    );
  }

  try {
    const token = headers?.split(" ")[1];
    const decoded = jwt.verify(token as string, SECRET_KEY as string);
    if (typeof decoded !== "string" && decoded && "userId" in decoded) {
      const userId = decoded.userId as string;

      const res = await prisma.friends.findMany({
        where: {
          OR: [{ user1Id: userId }, { user2Id: userId }],
        },
      });

      const friendIds = res.map((friend) => {
        if (friend.user1Id === userId) {
          return friend.user1Name;
        }
        return friend.user2Name;
      });
      return NextResponse.json({ friendIds });
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