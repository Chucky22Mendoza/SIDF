import { Title } from "./Title";
import { CarouselHome } from "./CarouselHome";
import { FotomontajeImages } from "../../domain/data";

export function Fotomontaje() {
  return (
    <>
      <Title title="¿Qué es un fotomontaje?" bgType="muted" />
      <div className="w-full max-w-4xl">
        <p className="text-gray-500">En el contexto de publicidad de cine, el fotomontaje dista de ser un collage de imágenes incrustadas para modificar
          la imagen original y  crear un concepto. También conocido como <span style={{ fontStyle: 'italic' }}>Lobby card</span> o Cartelera, el fotomontaje es el primer
          material pensado exclusivamente para la publicidad de cine. Aparecieron a principios del Siglo XX, y la influencia
          del arte en boga de la época, el <span style={{ fontStyle: 'italic' }}>Art  noveau</span> o arte nuevo, todavía es visible en
          los fotomontajes que se resguardan en la colección José Ruiz. </p>
        <br />
        <CarouselHome
          images={FotomontajeImages}
          orientation="right"
        />
        <p className="text-gray-500">El fotomontaje consiste en una fotografía tomada durante el rodaje (<span style={{ fontStyle: "italic" }}>still</span>),
          o bien, de los artistas estelares con el vestuario representativo del filme, misma que se pegaba sobre una base rígida de
          cartón o en cartulina, con el tiempo se hizo característica la incorporación del título así como los principales créditos de
          la película con una tipografía que se diseñaba exclusivamente para el filme.</p>
        <p className="text-gray-500">Regularmente se creaban juegos de ocho fotomontajes por película en un tamaño estándar de 11X14 pulgadas,
          el diseño era el mismo, solo se cambiaba la fotografía y se exhibían en el vestíbulo del cine como información adicional
          para el espectador. El uso práctico de fotomontajes desapareció con la llegada de las multisalas, que dejaban menos espacio
          para cada película.</p>
      </div>
    </>
  );
}
