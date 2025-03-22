import { IFilmView } from "@/domain/Filme";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<ResponseWrapper<IFilmView[]>>> {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('q') ?? '';

  try {
    const list = await prisma.filme.findMany({
      where: {
        AND: [
          {
            deletedAt: {
              equals: null,
            }
          },
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
        fondo: {
          select: {
            name: true,
          },
        },
        imagen1: true,
        imagen2: true,
        imagen3: true,
        Descripcion: {
          select: {
            yearRelease: true,
          }
        },
        Caracteristicas: {
          select: {
            alto: true,
            ancho: true,
            tipoMedida: true,
            soporte: {
              select: {
                name: true,
              }
            },
            tecnica: {
              select: {
                name: true,
              }
            },
          }
        },
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
      copies_available: film.copias_disponibles ?? 0,
      images: [film.imagen1 ?? '', film.imagen2 ?? '', film.imagen3 ?? ''].filter((image) => image !== ''),
      directors: film.det_directores.map((item) => item.director.name).join(', '),
      genders: film.DetGeneros.map((item) => item.genero.name).join(', '),
      productions: film.DetProducciones.map((item) => item.produccion.name).join(', '),
      stars: film.DetEstelares.map((item) => item.estelar.name).join(', '),
      filmLibrary: `${film.fondo.name} - ${film.Accesibilidad[0].archivo.name}`,
      downloadable: film.Accesibilidad[0].reproduccionDigital,
      available: (film?.copias_disponibles ?? 0) > 0,
      year: film.Descripcion[0].yearRelease,
      dimensions: `${film.Caracteristicas[0].ancho}x${film.Caracteristicas[0].alto} ${film.Caracteristicas[0].tipoMedida}`,
      format: `${film.Caracteristicas[0].tecnica.name} - ${film.Caracteristicas[0].soporte.name}`,
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