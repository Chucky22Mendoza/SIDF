import { catalogs } from "@/domain/Catalogs";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: 'Tipos de catálogos',
    data: catalogs,
    success: true,
  }, {
    status: 200,
  });
}