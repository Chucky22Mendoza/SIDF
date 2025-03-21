import { IDashboardResponse } from "@/domain/Dashboard";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse<ResponseWrapper<IDashboardResponse>>> {
  const { start_date, end_date } = await req.json();
  try {
    const result = await prisma.$queryRawUnsafe(`SELECT * FROM get_dashboard_data($1::TIMESTAMP, $2::TIMESTAMP);`, start_date, end_date) as IDashboardResponse[];
    return NextResponse.json({
      message: 'Dashboard consultado correctamente',
      data: result[0],
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