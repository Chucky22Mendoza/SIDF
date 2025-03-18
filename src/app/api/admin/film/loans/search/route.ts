import { ILoan } from "@/domain/Loans";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<ResponseWrapper<ILoan[]>>> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') ?? '';

    const list = await prisma.prestamo.findMany({
      where: {
        AND: [
          {
            deletedAt: {
              equals: null,
            }
          },
        ],
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            curp: {
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
            phone: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            filme: {
              OR: [
                {
                  articulo: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
                {
                  titulo: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
                {
                  AND: [
                    {
                      articulo: { not: null },
                    },
                    {
                      articulo: {
                        contains: query.split(" ")[0],
                        mode: 'insensitive',
                      },
                    },
                    {
                      titulo: {
                        contains: query.split(" ").slice(1).join(" "),
                        mode: 'insensitive',
                      },
                    },
                  ],
                },
              ]
            }
          },
        ],
      },
      select: {
        id: true,
        curp: true,
        name: true,
        phone: true,
        email: true,
        fk_id_filme: true,
        createdAt: true,
        filme: {
          select: {
            articulo: true,
            titulo: true,
          },
        },

      }
    });

    const loans: ILoan[] = list.map((loan) => ({
      id: loan.id,
      name: loan.name,
      curp: loan.curp,
      email: loan.email,
      phone: loan.phone,
      date: loan.createdAt,
      fk_id_filme: loan.fk_id_filme,
      filme: `${loan.filme.articulo} ${loan.filme.titulo}`.trim(),
    }));

    return NextResponse.json({
      message: 'Búsqueda de préstamos exitosa',
      data: loans,
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