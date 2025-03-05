import { Building, FileBox, Film } from "lucide-react"
import { Title } from "./Title"
import { CarouselHome } from "./CarouselHome"
import { FilmotecaImages } from "../../domain/data"

export function Filmoteca() {
  return (
    <>
      <Title title="FILMOTECA" bgType="muted" />
      <div className="flex flex-col flex-1 justify-center w-full max-w-4xl self-center">
        <p className="text-center text-gray-500 text-xl">El Fondo está conformado por  673 títulos en  4,871 unidades documentales, de las cuales, 740 se digitalizaron para consulta. Se han clasificado en tres colecciones:</p>
        <div className="flex flex-1 flex-wrap items-center">
          <div className="mt-5 mx-auto max-w-[400px] flex justify-center items-center flex-col">
            <Building className="text-red-500" height={80} width={70} />
            <h2 className="text-center text-black mb-3 text-2xl">AHEC (Archivo Histórico del Estado de Colima)</h2>
            <p className="text-center text-gray-500 mb-0">El Fondo Filmoteca cuenta con 353 títulos</p>
          </div>

          <div className="mt-5 mx-auto max-w-[400px] flex justify-center items-center flex-col">
            <FileBox className="text-red-500" height={80} width={70} />
            <h2 className="text-center text-black mb-3 text-2xl">José Ruiz</h2>
            <p className="text-center text-gray-500 mb-0">El Fondo Filmoteca cuenta con 54 títulos</p>
          </div>

          <div className="mt-5 mx-auto max-w-[400px] flex justify-center items-center flex-col">
            <Film className="text-red-500" height={80} width={70} />
            <h2 className="text-center text-black mb-3 text-2xl">IMCINE (Instituto Mexicano de Cine)</h2>
            <p className="text-center text-gray-500 mb-0">El Fondo Filmoteca cuenta con 266 títulos</p>
          </div>
        </div>

        <div className='w-full'>
          <p className="mt-5 text-gray-500">Las tres colecciones  se han registrado por unidad documental en catálogo digital disponible para el usuario, que incluye descripción de contenido, tipología, cantidad de copias, fecha, país de origen,  director, productor  y actores estelares, entre otros datos técnicos como formato, técnica de impresión, material del soporte y estado de conservación.</p>
          <CarouselHome
            images={FilmotecaImages}
            orientation="right"
          />
          <p className="text-gray-500">El rescate, organización, conservación y difusión de nuestro patrimonio gráfico de cine, permiten sensibilizar a la población sobre su importancia, así como  brindar atención a investigadores y usuarios interesados en la historia del cine comercial en Colima. </p>
        </div>

      </div>
    </>
  )
}

export default Filmoteca