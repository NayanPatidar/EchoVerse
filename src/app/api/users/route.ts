import prisma from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, password } = data;

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
      return NextResponse.json(
        {
          message: " User Already Present ! Please Sign in",
        },
        { status: 209 }
      );
    }

    const res = await prisma.user.create({
      data: { name: name, email: email, password: password },
    });

    if (res) {
      return NextResponse.json({
        message: " User Created Successfully",
      });
    }
  } catch (error: any) {
    console.error("Found Error : ", error.message);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
