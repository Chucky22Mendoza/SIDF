import { ResponseWrapper } from "@/domain/Response";
import { IUser } from "@/domain/Users";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { encryptValue } from "../../auth/utils";

export async function GET(): Promise<NextResponse<ResponseWrapper<IUser[]>>> {
  try {
    const list = await prisma.usuario.findMany({
      select: {
        id: true,
        fullname: true,
        nickname: true,
        email: true,
        rol: {
          select: {
            id: true,
            name: true,
          },
        },
      }
    }) as IUser[];

    return NextResponse.json({
      message: 'Usuarios encontrados',
      data: list,
      success: true,
    }, {
      status: 200,
    });

  } catch (error) {
    return NextResponse.json({
      message: 'Error del servidor, intente de nuevo',
      success: false,
    }, {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<ResponseWrapper<string>>> {
  try {
    const {
      email,
      fullname,
      nickname,
      fk_id_rol,
      password,
    } = await req.json();

    const pwdEncrypted = await encryptValue(password);
    const inserted = await prisma.usuario.create({
      data: {
        email,
        fullname,
        nickname,
        password: pwdEncrypted,
        rol: {
          connect: {
            id: fk_id_rol,
          },
        }
      },
    });
    return NextResponse.json({
      message: 'Registro creado exitosamente',
      data: inserted.id,
      success: true,
    }, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: 'Error del servidor, intente de nuevo',
      success: false,
    }, {
      status: 500,
    });
  }
}
