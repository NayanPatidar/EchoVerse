import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY_API as string;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password as string
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          {
            message: " Invalid Credentials ! ",
          },
          { status: 401 }
        );
      }

      const token = jwt.sign(
        { userId: user.id, name: user.name, email: email },
        SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      console.log(`Token : ${token}`);

      return NextResponse.json(
        {
          message: " Signed In !!",
          token: token,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: " User Not Found ! ",
        },
        { status: 404 }
      );
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
