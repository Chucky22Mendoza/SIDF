import { IFilterHistory, LoanHistoryType } from "@/domain/Loans";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse<ResponseWrapper<LoanHistoryType[]>>> {
  const {
    filter,
    startDate,
    endDate,
    query,
  }: IFilterHistory = await req.json();

  try {
    const list = await prisma.prestamo.findMany({
      where: {
        AND: [
          {
            [filter as 'createdAt' | 'deletedAt']: {
              gte: new Date(`${startDate} 00:00:00`),
              lte: new Date(`${endDate} 23:59:59`),
            },
          },
          {
            OR: query
              ? [
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
                              contains: query?.split(" ")[0],
                              mode: 'insensitive',
                            },
                          },
                          {
                            titulo: {
                              contains: query?.split(" ").slice(1).join(" "),
                              mode: 'insensitive',
                            },
                          },
                        ],
                      },
                    ]
                  }
                },
              ]
              : undefined,
          }
        ],
      },
      select: {
        id: true,
        curp: true,
        name: true,
        phone: true,
        email: true,
        createdAt: true,
        deletedAt: true,
        fk_id_filme: true,
        filme: {
          select: {
            articulo: true,
            titulo: true,
          },
        },
      }
    });

    const loans: LoanHistoryType[] = list.map((loan) => ({
      id: loan.id,
      name: loan.name,
      curp: loan.curp,
      email: loan.email,
      phone: loan.phone,
      loanDate: loan.createdAt,
      returnDate: loan.deletedAt,
      status: !loan.deletedAt ? 'En préstamo' : 'Devuelto',
      filme: `${loan.filme.articulo} ${loan.filme.titulo}`.trim(),
    }));

    return NextResponse.json({
      message: 'Préstamos encontrados',
      data: loans,
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