import { NextResponse } from "next/server";
import dotenv from "dotenv";
import prisma from "@/lib/prisma";
dotenv.config();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const Users = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        name: true,
        googleId: true,
        email: true,
      },
    });

    return NextResponse.json({ Users });
  } catch (error: any) {
    console.error("Got Error In Searching Users : ", error.message);
  }
}
