import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export async function PUT(req: NextRequest, { params }: Props): Promise<NextResponse<ResponseWrapper<string>>> {
  try {
    const {
      fk_id_filme,
      name,
      email,
      phone,
      curp,
    } = await req.json();
    const { id } = params;

    await prisma.prestamo.update({
      where: {
        id,
      },
      data: {
        fk_id_filme,
        name,
        email,
        phone,
        curp,
      },
    });

    return NextResponse.json({
      message: 'Préstamo actualizado exitosamente',
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

export async function DELETE(_: NextRequest, { params }: Props): Promise<NextResponse<ResponseWrapper<string>>> {
  try {
    const { id } = params;
    await prisma.prestamo.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      }
    });
    return NextResponse.json({
      message: 'Préstamo eliminado exitosamente',
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
