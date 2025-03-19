import { IDashboardResponse } from "@/domain/Dashboard";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse<ResponseWrapper<IDashboardResponse>>> {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM get_dashboard_data();` as IDashboardResponse[];

    return NextResponse.json({
      message: 'Dashboard consultado correctamente',
      data: result[0] as IDashboardResponse,
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