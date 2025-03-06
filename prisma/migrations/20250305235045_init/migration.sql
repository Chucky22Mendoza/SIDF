-- CreateEnum
CREATE TYPE "UnidadMedida" AS ENUM ('CM', 'PUL');

-- CreateTable
CREATE TABLE "tipologia" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tipologia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fondo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "fondo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coleccion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "coleccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estante" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "estante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caja" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "caja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "director" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "director_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produccion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "produccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estelar" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "estelar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genero" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pais" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soporte" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "soporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tecnica" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tecnica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalogador" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "catalogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capturista" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "capturista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archivo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "archivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conservacion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "conservacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "intervencion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "intervencion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ubicacion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ubicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fk_id_rol" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filme" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "copias" INTEGER NOT NULL,
    "imagen1" TEXT,
    "imagen2" TEXT,
    "imagen3" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "fk_id_tipologia" TEXT NOT NULL,
    "fk_id_fondo" TEXT NOT NULL,
    "fk_id_coleccion" TEXT NOT NULL,
    "fk_id_caja" TEXT NOT NULL,
    "fk_id_estante" TEXT NOT NULL,

    CONSTRAINT "filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descripcion" (
    "id" TEXT NOT NULL,
    "year_release" INTEGER NOT NULL,
    "fk_id_filme" TEXT NOT NULL,
    "fk_id_director" TEXT NOT NULL,
    "fk_id_pais" TEXT NOT NULL,

    CONSTRAINT "descripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "det_producciones" (
    "id" TEXT NOT NULL,
    "fk_id_filme" TEXT NOT NULL,
    "fk_id_produccion" TEXT NOT NULL,

    CONSTRAINT "det_producciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "det_estelares" (
    "id" TEXT NOT NULL,
    "fk_id_filme" TEXT NOT NULL,
    "fk_id_estelar" TEXT NOT NULL,

    CONSTRAINT "det_estelares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "det_generos" (
    "id" TEXT NOT NULL,
    "fk_id_filme" TEXT NOT NULL,
    "fk_id_genero" TEXT NOT NULL,

    CONSTRAINT "det_generos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caracteristicas" (
    "id" TEXT NOT NULL,
    "alto" DOUBLE PRECISION NOT NULL,
    "ancho" DOUBLE PRECISION NOT NULL,
    "tipo_medida" "UnidadMedida" NOT NULL DEFAULT 'CM',
    "fk_id_filme" TEXT NOT NULL,
    "fk_id_soporte" TEXT NOT NULL,
    "fk_id_tecnica" TEXT NOT NULL,

    CONSTRAINT "caracteristicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accesibilidad" (
    "id" TEXT NOT NULL,
    "consulta" BOOLEAN NOT NULL,
    "reproduccion" BOOLEAN NOT NULL,
    "reproduccion_digital" BOOLEAN NOT NULL,
    "observaciones" TEXT DEFAULT 'Sin observaciones',
    "year_cataloging" INTEGER NOT NULL,
    "organizacion_previa" TEXT,
    "fk_id_filme" TEXT NOT NULL,
    "fk_id_catalogador" TEXT NOT NULL,
    "fk_id_capturista" TEXT NOT NULL,
    "fk_id_archivo" TEXT NOT NULL,

    CONSTRAINT "accesibilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado_conservacion" (
    "id" TEXT NOT NULL,
    "num_copia" INTEGER,
    "observaciones" TEXT DEFAULT 'Sin observaciones',
    "consulta" BOOLEAN DEFAULT true,
    "fk_id_filme" TEXT NOT NULL,
    "fk_id_intervencion_sugerida" TEXT,
    "fk_id_intervencion_realizada" TEXT,
    "fk_id_ubicacion" TEXT NOT NULL,

    CONSTRAINT "estado_conservacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nickname_key" ON "usuario"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_fk_id_rol_fkey" FOREIGN KEY ("fk_id_rol") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme" ADD CONSTRAINT "filme_fk_id_tipologia_fkey" FOREIGN KEY ("fk_id_tipologia") REFERENCES "tipologia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme" ADD CONSTRAINT "filme_fk_id_fondo_fkey" FOREIGN KEY ("fk_id_fondo") REFERENCES "fondo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme" ADD CONSTRAINT "filme_fk_id_coleccion_fkey" FOREIGN KEY ("fk_id_coleccion") REFERENCES "coleccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme" ADD CONSTRAINT "filme_fk_id_caja_fkey" FOREIGN KEY ("fk_id_caja") REFERENCES "caja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme" ADD CONSTRAINT "filme_fk_id_estante_fkey" FOREIGN KEY ("fk_id_estante") REFERENCES "estante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descripcion" ADD CONSTRAINT "descripcion_fk_id_filme_fkey" FOREIGN KEY ("fk_id_filme") REFERENCES "filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descripcion" ADD CONSTRAINT "descripcion_fk_id_director_fkey" FOREIGN KEY ("fk_id_director") REFERENCES "director"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descripcion" ADD CONSTRAINT "descripcion_fk_id_pais_fkey" FOREIGN KEY ("fk_id_pais") REFERENCES "pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "det_producciones" ADD CONSTRAINT "det_producciones_fk_id_filme_fkey" FOREIGN KEY ("fk_id_filme") REFERENCES "filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "det_producciones" ADD CONSTRAINT "det_producciones_fk_id_produccion_fkey" FOREIGN KEY ("fk_id_produccion") REFERENCES "produccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "det_estelares" ADD CONSTRAINT "det_estelares_fk_id_filme_fkey" FOREIGN KEY ("fk_id_filme") REFERENCES "filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "det_estelares" ADD CONSTRAINT "det_estelares_fk_id_estelar_fkey" FOREIGN KEY ("fk_id_estelar") REFERENCES "estelar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "det_generos" ADD CONSTRAINT "det_generos_fk_id_filme_fkey" FOREIGN KEY ("fk_id_filme") REFERENCES "filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "det_generos" ADD CONSTRAINT "det_generos_fk_id_genero_fkey" FOREIGN KEY ("fk_id_genero") REFERENCES "genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caracteristicas" ADD CONSTRAINT "caracteristicas_fk_id_filme_fkey" FOREIGN KEY ("fk_id_filme") REFERENCES "filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caracteristicas" ADD CONSTRAINT "caracteristicas_fk_id_soporte_fkey" FOREIGN KEY ("fk_id_soporte") REFERENCES "soporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caracteristicas" ADD CONSTRAINT "caracteristicas_fk_id_tecnica_fkey" FOREIGN KEY ("fk_id_tecnica") REFERENCES "tecnica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accesibilidad" ADD CONSTRAINT "accesibilidad_fk_id_filme_fkey" FOREIGN KEY ("fk_id_filme") REFERENCES "filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accesibilidad" ADD CONSTRAINT "accesibilidad_fk_id_catalogador_fkey" FOREIGN KEY ("fk_id_catalogador") REFERENCES "catalogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accesibilidad" ADD CONSTRAINT "accesibilidad_fk_id_capturista_fkey" FOREIGN KEY ("fk_id_capturista") REFERENCES "capturista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accesibilidad" ADD CONSTRAINT "accesibilidad_fk_id_archivo_fkey" FOREIGN KEY ("fk_id_archivo") REFERENCES "archivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estado_conservacion" ADD CONSTRAINT "estado_conservacion_fk_id_filme_fkey" FOREIGN KEY ("fk_id_filme") REFERENCES "filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estado_conservacion" ADD CONSTRAINT "estado_conservacion_fk_id_intervencion_sugerida_fkey" FOREIGN KEY ("fk_id_intervencion_sugerida") REFERENCES "intervencion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estado_conservacion" ADD CONSTRAINT "estado_conservacion_fk_id_intervencion_realizada_fkey" FOREIGN KEY ("fk_id_intervencion_realizada") REFERENCES "intervencion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estado_conservacion" ADD CONSTRAINT "estado_conservacion_fk_id_ubicacion_fkey" FOREIGN KEY ("fk_id_ubicacion") REFERENCES "ubicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
