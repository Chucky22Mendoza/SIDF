import { IFilmView } from "@/domain/Filme";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, { params }: Props): Promise<NextResponse<ResponseWrapper<IFilmView>>> {
  try {
    const film = await prisma.filme.findFirst({
      where: {
        AND: [
          {
            id: params.id,
          },
          {
            deletedAt: {
              equals: null,
            }
          }
        ]
      },
      select: {
        id: true,
        titulo: true,
        articulo: true,
        copias: true,
        fondo: {
          select: {
            name: true,
          },
        },
        imagen1: true,
        imagen2: true,
        imagen3: true,
        det_directores: {
          select: {
            director: {
              select: {
                name: true,
              },
            },
          },
        },
        DetGeneros: {
          select: {
            genero: {
              select: {
                name: true,
              },
            },
          },
        },
        DetEstelares: {
          select: {
            estelar: {
              select: {
                name: true,
              },
            },
          },
        },
        DetProducciones: {
          select: {
            produccion: {
              select: {
                name: true,
              },
            },
          },
        },
        Accesibilidad: {
          select: {
            archivo: {
              select: {
                name: true,
              }
            },
            consulta: true,
            reproduccion: true,
            reproduccionDigital: true,
          }
        }
      },
    });

    if (!film) {
      return NextResponse.json({
        message: 'Filme no encontrado',
        success: false,
      }, {
        status: 404,
      });
    }

    const filmTransform: IFilmView = {
      id: film.id,
      title: `${film.articulo} ${film.titulo}`.trim(),
      copies: film.copias,
      fondo: film.fondo.name,
      images: [film.imagen1 ?? '', film.imagen2 ?? '', film.imagen3 ?? ''].filter((image) => image !== ''),
      directors: film.det_directores.map((item) => item.director.name).join(', '),
      genders: film.DetGeneros.map((item) => item.genero.name).join(', '),
      productions: film.DetProducciones.map((item) => item.produccion.name).join(', '),
      stars: film.DetEstelares.map((item) => item.estelar.name).join(', '),
      archive: film.Accesibilidad[0].archivo.name,
      isConsutation: film.Accesibilidad[0].consulta,
      isReproductional: film.Accesibilidad[0].reproduccion,
      isDigital: film.Accesibilidad[0].reproduccionDigital,
    };

    return NextResponse.json({
      message: 'Filme encontrado',
      data: filmTransform,
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
