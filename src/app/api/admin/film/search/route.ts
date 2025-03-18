import { IFilmRow } from "@/domain/Filme";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<ResponseWrapper<IFilmRow[]>>> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') ?? '';

    const list = await prisma.filme.findMany({
      where: {
        AND: [
          {
            deletedAt: {
              equals: null,
            }
          }
        ],
        OR: [
          {
            articulo: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            titulo: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            AND: [
              {
                articulo: { not: null },
              },
              {
                articulo: {
                  contains: query.split(" ")[0],
                  mode: 'insensitive',
                },
              },
              {
                titulo: {
                  contains: query.split(" ").slice(1).join(" "),
                  mode: 'insensitive',
                },
              },
            ],
          },
          {
            det_directores: {
              some: {
                director: {
                  name: {
                    contains: query,
                    mode: 'insensitive',
                  }
                }
              }
            }
          },
          {
            DetGeneros: {
              some: {
                genero: {
                  name: {
                    contains: query,
                    mode: 'insensitive',
                  }
                }
              }
            }
          },
          {
            DetEstelares: {
              some: {
                estelar: {
                  name: {
                    contains: query,
                    mode: 'insensitive',
                  }
                }
              }
            }
          },
          {
            DetProducciones: {
              some: {
                produccion: {
                  name: {
                    contains: query,
                    mode: 'insensitive',
                  }
                }
              }
            }
          },
          {
            fondo: {
              name: {
                contains: query,
                mode: 'insensitive',
              }
            },
          },
          {
            Accesibilidad: {
              some: {
                archivo: {
                  name: {
                    contains: query,
                    mode: 'insensitive',
                  }
                }
              }
            }
          }
        ],
      },
      select: {
        id: true,
        titulo: true,
        articulo: true,
        copias: true,
        copias_disponibles: true,
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
        Descripcion: {
          select: {
            yearRelease: true
          },
        },
      },
      orderBy: {
        titulo: 'asc',
      },
    });

    const listTransform: IFilmRow[] = list.map((film) => ({
      id: film.id,
      year: film.Descripcion[0].yearRelease,
      director: film.det_directores.map((item) => item.director.name).join(', '),
      gender: film.DetGeneros.map((item) => item.genero.name).join(', '),
      title: `${film.articulo} ${film.titulo}`.trim(),
      copies: `${film.copias_disponibles} de ${film.copias}`,
    }));

    return NextResponse.json({
      message: 'Búsqueda de filmes exitosa',
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
