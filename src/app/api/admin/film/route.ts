import { AccesibilityType, CharacteristicsType, DescriptionType, FilmeType, IFilmRow } from "@/domain/Filme";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ResponseWrapper<IFilmRow[]>>> {
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

export async function POST(req: NextRequest): Promise<NextResponse<ResponseWrapper<string>>> {
  try {
    const {
      general,
      description,
      characteristics,
      accesibility,
    }: {
      general: FilmeType,
      description: DescriptionType,
      characteristics: CharacteristicsType,
      accesibility: AccesibilityType,
    } = await req.json();

    const transaction = await prisma.$transaction(async (tx) =>
      await tx.filme.create({
        data: {
          titulo: general.titulo,
          articulo: general.articulo,
          copias: general.copias,
          fkIdCaja: general.fkIdCaja,
          fkIdColeccion: general.fkIdColeccion,
          fkIdEstante: general.fkIdEstante,
          fkIdFondo: general.fkIdFondo,
          fkIdTipologia: general.fkIdTipologia,
          imagen1: general.imagen1,
          imagen2: general.imagen2,
          imagen3: general.imagen3,
          det_directores: {
            createMany: {
              data: description.directors.map((director) => ({
                fk_id_director: director,
              }))
            }
          },
          DetEstelares: {
            createMany: {
              data: description.stars.map((star) => ({
                fkIdEstelar: star,
              }))
            }
          },
          DetGeneros: {
            createMany: {
              data: description.genders.map((gender) => ({
                fkIdGenero: gender,
              }))
            }
          },
          DetProducciones: {
            createMany: {
              data: description.productions.map((production) => ({
                fkIdProduccion: production,
              }))
            }
          },
          Descripcion: {
            create: {
              yearRelease: description.yearRelease,
              fkIdPais: description.fkIdPais,
            }
          },
          Caracteristicas: {
            create: {
              alto: characteristics.alto,
              ancho: characteristics.ancho,
              fkIdSoporte: characteristics.fkIdSoporte,
              fkIdTecnica: characteristics.fkIdTecnica,
              tipoMedida: characteristics.tipoMedida,
            }
          },
          Accesibilidad: {
            create: {
              consulta: accesibility.consulta,
              reproduccion: accesibility.reproduccion,
              reproduccionDigital: accesibility.reproduccionDigital,
              yearCataloging: accesibility.yearCataloging,
              fkIdArchivo: accesibility.fkIdArchivo,
              fkIdCapturista: accesibility.fkIdCapturista,
              fkIdCatalogador: accesibility.fkIdCatalogador,
              observaciones: accesibility.observaciones,
            }
          }
        }
      })
    );

    return NextResponse.json({
      message: 'Registro de filme creado exitosamente',
      data: transaction.id,
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
