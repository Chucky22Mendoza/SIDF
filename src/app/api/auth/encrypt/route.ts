import { NextRequest, NextResponse } from "next/server";
import { encryptValue } from "../utils";

export async function POST(request: NextRequest) {
  const { toEncrypt } = await request.json();

  try {
    const encrypted = await encryptValue(toEncrypt);

    return NextResponse.json({
      message: 'Valor encriptado correctamente',
      value: encrypted,
    }, {
      status: 200,
    });
  } catch (error) {
    console.error("[ENCRYPT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}