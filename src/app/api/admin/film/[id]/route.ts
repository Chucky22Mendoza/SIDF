import { IFilm } from "@/domain/Filme";
import { ResponseWrapper } from "@/domain/Response";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, { params }: Props): Promise<NextResponse<ResponseWrapper<IFilm>>> {
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
        titulo: true,
        articulo: true,
        copias: true,
        fkIdCaja: true,
        fkIdColeccion: true,
        fkIdEstante: true,
        fkIdFondo: true,
        fkIdTipologia: true,
        imagen1: true,
        imagen2: true,
        imagen3: true,
        det_directores: {
          select: {
            director: {
              select: {
                id: true,
              }
            },
          }
        },
        DetEstelares: {
          select: {
            estelar: {
              select: {
                id: true,
              }
            },
          }
        },
        DetGeneros: {
          select: {
            genero: {
              select: {
                id: true,
              }
            }
          }
        },
        DetProducciones: {
          select: {
            produccion: {
              select: {
                id: true,
              }
            }
          }
        },
        Descripcion: {
          select: {
            yearRelease: true,
            fkIdPais: true,
          }
        },
        Caracteristicas: {
          select: {
            alto: true,
            ancho: true,
            fkIdSoporte: true,
            fkIdTecnica: true,
            tipoMedida: true,
          }
        },
        Accesibilidad: {
          select: {
            consulta: true,
            reproduccion: true,
            reproduccionDigital: true,
            yearCataloging: true,
            fkIdArchivo: true,
            fkIdCapturista: true,
            fkIdCatalogador: true,
            observaciones: true,
          }
        }
      }
    });

    if (!film) {
      return NextResponse.json({
        message: 'Filme no encontrado',
        success: false,
      }, {
        status: 404,
      });
    }

    const filmTransform: IFilm = {
      general: {
        articulo: film.articulo,
        copias: film.copias,
        fkIdCaja: film.fkIdCaja,
        fkIdColeccion: film.fkIdColeccion,
        fkIdEstante: film.fkIdEstante,
        fkIdFondo: film.fkIdFondo,
        fkIdTipologia: film.fkIdTipologia,
        imagen1: film.imagen1,
        imagen2: film.imagen2,
        imagen3: film.imagen3,
        titulo: film.titulo,
      },
      description: {
        fkIdPais: film.Descripcion[0].fkIdPais,
        yearRelease: film.Descripcion[0].yearRelease,
        directors: film.det_directores.map((item) => item.director.id),
        genders: film.DetGeneros.map((item) => item.genero.id),
        productions: film.DetProducciones.map((item) => item.produccion.id),
        stars: film.DetEstelares.map((item) => item.estelar.id),
      },
      characteristics: {
        alto: Number(film.Caracteristicas[0].alto),
        ancho: Number(film.Caracteristicas[0].ancho),
        fkIdSoporte: film.Caracteristicas[0].fkIdSoporte,
        fkIdTecnica: film.Caracteristicas[0].fkIdTecnica,
        tipoMedida: film.Caracteristicas[0].tipoMedida,
      },
      accesibility: {
        consulta: film.Accesibilidad[0].consulta,
        reproduccion: film.Accesibilidad[0].consulta,
        reproduccionDigital: film.Accesibilidad[0].consulta,
        observaciones: film.Accesibilidad[0].observaciones,
        fkIdArchivo: film.Accesibilidad[0].fkIdArchivo,
        fkIdCapturista: film.Accesibilidad[0].fkIdCapturista,
        fkIdCatalogador: film.Accesibilidad[0].fkIdCatalogador,
        yearCataloging: film.Accesibilidad[0].yearCataloging,
        organizacionPrevia: null,
      },
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

export async function PUT(req: NextRequest, { params }: Props): Promise<NextResponse<ResponseWrapper<string>>> {
  try {
    const {
      general,
      description,
      characteristics,
      accesibility
    }: IFilm = await req.json();
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        message: 'El id es necesario para realizar esta petición',
        success: false,
      }, {
        status: 500,
      });
    }

    const transaction = await prisma.$transaction(async (tx) =>{
      const descriptionFilter = await tx.descripcion.findFirst({
        where: {
          fkIdFilme: id,
        },
        select: {
          id: true,
        }
      });
      const characteristicsFilter = await tx.caracteristicas.findFirst({
        where: {
          fkIdFilme: id,
        },
        select: {
          id: true,
        }
      });
      const accesibilityFilter = await tx.accesibilidad.findFirst({
        where: {
          fkIdFilme: id,
        },
        select: {
          id: true,
        }
      });

      return await tx.filme.update({
        where: {
          id,
        },
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
            deleteMany: {
              fk_id_filme: id,
            },
            createMany: {
              data: description.directors.map((director) => ({
                fk_id_director: director,
              }))
            }
          },
          DetEstelares: {
            deleteMany: {
              fkIdFilme: id,
            },
            createMany: {
              data: description.stars.map((star) => ({
                fkIdEstelar: star,
              }))
            }
          },
          DetGeneros: {
            deleteMany: {
              fkIdFilme: id,
            },
            createMany: {
              data: description.genders.map((gender) => ({
                fkIdGenero: gender,
              }))
            }
          },
          DetProducciones: {
            deleteMany: {
              fkIdFilme: id,
            },
            createMany: {
              data: description.productions.map((production) => ({
                fkIdProduccion: production,
              }))
            }
          },
          Descripcion: {
            update: {
              where: {
                id: descriptionFilter?.id,
              },
              data: {
                yearRelease: description.yearRelease,
                fkIdPais: description.fkIdPais,
              }
            },

          },
          Caracteristicas: {
            update: {
              where: {
                id: characteristicsFilter?.id,
              },
              data: {
                alto: characteristics.alto,
                ancho: characteristics.ancho,
                fkIdSoporte: characteristics.fkIdSoporte,
                fkIdTecnica: characteristics.fkIdTecnica,
                tipoMedida: characteristics.tipoMedida,
              }
            }
          },
          Accesibilidad: {
            update: {
              where: {
                id: accesibilityFilter?.id,
              },
              data: {
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
        }
      });
    });

    return NextResponse.json({
      message: 'Registro de filme actualizado exitosamente',
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

export async function DELETE(_: NextRequest, { params }: Props): Promise<NextResponse<ResponseWrapper<string>>> {
  try {
    const { id } = params;
    await prisma.filme.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      }
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
