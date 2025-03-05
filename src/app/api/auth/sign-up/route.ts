import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { encryptValue } from "../utils";

export async function POST(request: NextRequest) {
  const {
    fullname,
    nickname,
    password,
    email,
    fk_id_rol,
  } = await request.json();

  if (!fullname || !nickname || !password || !email || !fk_id_rol) {
    return NextResponse.json({
      message: 'Todos los campos son requeridos',
    }, {
      status: 400,
    });
  }

  try {
    const user = await prisma.usuario.findFirst({
      where: {
        OR: [
          { nickname },
          { email },
        ],
      },
    });
    if (user) {
      return NextResponse.json({
        message: 'El usuario ya existe',
      }, {
        status: 400,
      });
    }

    const encryptPassword = await encryptValue(password);
    await prisma.usuario.create({
      data: {
        fullname,
        nickname,
        password: encryptPassword,
        email,
        fkIdRol: fk_id_rol,
      },
    });

    return NextResponse.json({
      message: 'Usuario creado correctamente',
    }, {
      status: 200,
    });
  } catch (error) {
    console.error("[SIGN_UP_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
