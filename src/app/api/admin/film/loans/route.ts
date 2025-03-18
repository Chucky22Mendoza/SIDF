import { ILoan } from "@/domain/Loans";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ResponseWrapper<ILoan[]>>> {
  try {
    const list = await prisma.prestamo.findMany({
      where: {
        deletedAt: {
          equals: null,
        }
      },
      select: {
        id: true,
        curp: true,
        name: true,
        phone: true,
        email: true,
        createdAt: true,
        fk_id_filme: true,
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
      message: 'Préstamos encontrados',
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

export async function POST(req: NextRequest): Promise<NextResponse<ResponseWrapper<string>>> {
  try {
    const {
      fk_id_filme,
      name,
      email,
      phone,
      curp,
    } = await req.json();

    const inserted = await prisma.prestamo.create({
      data: {
        name,
        email,
        phone,
        curp,
        fk_id_filme,
      },
    });

    return NextResponse.json({
      message: 'Préstamo registrado exitosamente',
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
