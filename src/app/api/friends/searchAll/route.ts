import { NextResponse } from "next/server";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { request } from "http";
import prisma from "@/lib/prisma";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY_API;

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

      const Users = await prisma.user.findMany({
        where: {
          name: {
            startsWith: userName as string,
            mode: "insensitive",
          },
          id: {
            not: userId,
          },
        },
        select: {
          id: true,
          name: true,
          googleId: true,
          email: true,
        },
      });

      return NextResponse.json({ Users });
    }
  } catch (error: any) {
    console.error("Got Error In Searching Users : ", error.message);
  }
}
