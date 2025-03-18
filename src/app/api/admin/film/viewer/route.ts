import { IFilmView } from "@/domain/Filme";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ResponseWrapper<IFilmView[]>>> {
  try {
    const list = await prisma.filme.findMany({
      where: {
        deletedAt: {
          equals: null,
        }
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
      orderBy: {
        titulo: 'asc',
      },
    });

    const listTransform: IFilmView[] = list.map((film) => ({
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
    }));

    return NextResponse.json({
      message: 'Filmes encontrados',
      data: listTransform,
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