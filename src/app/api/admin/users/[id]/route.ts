import { encryptValue } from "@/app/api/auth/utils";
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
      fullname,
      nickname,
      email,
      password,
      fk_id_rol,
    } = await req.json();
    const { id } = params;
    const newPwdEncrypted = password ? await encryptValue(password) : undefined;
    let data = {
      fullname,
      nickname,
      email,
      rol: {
        connect: {
          id: fk_id_rol,
        },
      },
      password: newPwdEncrypted,
    };

    if (!newPwdEncrypted) {
      delete data.password;
    }

    await prisma.usuario.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json({
      message: 'Registro actualizado exitosamente',
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
    await prisma.usuario.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      message: 'Registro eliminado exitosamente',
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
