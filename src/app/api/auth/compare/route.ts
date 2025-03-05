import { NextRequest, NextResponse } from "next/server";
import { compareValues } from "../utils";

export async function POST(request: NextRequest) {
  const { toCompare, encrypted } = await request.json();

  try {
    const isSame = await compareValues(toCompare, encrypted);

    return NextResponse.json({
      message: 'Los valores coinciden',
      value: isSame,
    }, {
      status: 200,
    });
  } catch (error) {
    console.error("[COMPARE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
