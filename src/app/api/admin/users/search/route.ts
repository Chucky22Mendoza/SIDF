import { ResponseWrapper } from "@/domain/Response";
import { IUser } from "@/domain/Users";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<ResponseWrapper<IUser[]>>> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') ?? '';

    const list = await prisma.usuario.findMany({
      where: {
        OR: [
          {
            fullname: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            nickname: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            rol: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
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
      message: 'Búsqueda de usuarios exitosa',
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