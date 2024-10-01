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

  try {
    const Users = await prisma.user.findMany({
      where: {
        name: {
          startsWith: userName as string,
          mode: "insensitive",
        },
      },
    });
    console.log(Users);

    return NextResponse.json({ Users });
  } catch (error: any) {
    console.error("Got Error In Searching Users : ", error.message);
  }
}
