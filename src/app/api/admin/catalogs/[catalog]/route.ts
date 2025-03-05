import { CatalogsType, ICatalogData } from "@/domain/Catalogs";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    catalog: CatalogsType;
  };
};

export async function GET(_: NextRequest, { params }: Props): Promise<NextResponse<ResponseWrapper<ICatalogData[]>>> {
  try {
    const { catalog } = params;
    if (catalog) {
      const list = await prisma.$queryRawUnsafe(`SELECT * FROM ${catalog}`) as ICatalogData[];
      console.log(list);
      return NextResponse.json({
        message: 'Catálogo encontrado',
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

export async function POST(req: NextRequest, { params }: Props): Promise<NextResponse<ResponseWrapper<string>>> {
  try {
    const { name } = await req.json();
    const { catalog } = params;
    if (catalog) {
      const inserted = await prisma.$queryRawUnsafe(`INSERT INTO ${catalog}(name) VALUES($1) RETURNING id`, name) as { id: string }[];
      return NextResponse.json({
        message: 'Registro insertado en el catálogo',
        data: inserted[0].id,
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
