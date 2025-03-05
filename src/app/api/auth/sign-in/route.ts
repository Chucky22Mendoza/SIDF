import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { compareValues } from "../utils";
import { sign } from "jsonwebtoken";
import { Usuario } from "@prisma/client";
import { cookies } from "next/headers";

const jwtKey = process.env.SECRET_JWT_KEY;

const createToken = (user: Usuario) => {
  return sign({ id: user.id, email: user.email }, jwtKey as string, {
    expiresIn: 86400
  });
};

export async function POST(request: NextRequest) {
  const { nickname, password } = await request.json();

  if (!nickname || !password) {
    return NextResponse.json({
      message: 'Ingresar usuario y contraseña',
    }, {
      status: 400,
    });
  }

  try {
    const user = await prisma.usuario.findFirst({
      where: {
        nickname,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: 'El usuario no existe',
      }, {
        status: 400,
      });
    }

    const isMatch = await compareValues(password, user.password);

    if (isMatch) {
      const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
      const tokenCreated = createToken(user);

      cookies().set('user-login', tokenCreated, {
        expires: exp,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return NextResponse.json({
        message: 'Usuario encontrado',
        data: {
          token: tokenCreated,
          role: user.fkIdRol,
          userId: user.id,
        },
      }, {
        status: 200,
      });
    }

    return NextResponse.json({
      message: 'Usuario o Contraseña incorrecta',
    }, {
      status: 400,
    });
  } catch (error) {
    console.error("[SIGN_UP_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
