import { CatalogsType } from "@/domain/Catalogs";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    catalog: CatalogsType;
    id: string;
  };
};

export async function PUT(req: NextRequest, { params }: Props): Promise<NextResponse<ResponseWrapper<string>>> {
  try {
    const { name } = await req.json();
    const { catalog, id } = params;
    if (catalog) {
      await prisma.$executeRawUnsafe(`UPDATE ${catalog} SET name = $1 WHERE id = $2::UUID`, name, id);
      return NextResponse.json({
        message: 'Registro actualizado en el catálogo',
        success: true,
      }, {
        status: 200,
      });
    }

    return NextResponse.json({
      message: 'Catálogo no encontrado',
      success: true,
    }, {
      status: 404,
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
    const { catalog, id } = params;
    if (catalog) {
      await prisma.$executeRawUnsafe(`DELETE FROM ${catalog} WHERE id = $1::UUID`, id);
      return NextResponse.json({
        message: 'Registro eliminado en el catálogo',
        success: true,
      }, {
        status: 200,
      });
    }

    return NextResponse.json({
      message: 'Catalogo no encontrado',
      success: true,
    }, {
      status: 404,
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
