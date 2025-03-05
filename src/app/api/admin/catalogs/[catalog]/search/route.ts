import { CatalogsType, ICatalogData } from "@/domain/Catalogs";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    catalog: CatalogsType;
  };
}

export async function GET(req: NextRequest, { params }: Props): Promise<NextResponse<ResponseWrapper<ICatalogData[]>>> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get('q');
    const { catalog } = params;
    const query = q ? `%${q.toLowerCase()}%` : '%';

    if (catalog) {
      const list = await prisma.$queryRawUnsafe(`SELECT * FROM ${catalog} WHERE lower(name) LIKE $1`, query) as ICatalogData[];
      return NextResponse.json({
        message: 'Busqueda de catálogo encontrada',
        data: list,
        success: true,
      }, {
        status: 200,
      });
    }

    return NextResponse.json({
      message: 'Catálogo no encontrado',
      success: false,
    }, {
      status: 404,
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