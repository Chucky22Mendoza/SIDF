import { Title } from "./Title";
import { CarouselHome } from "./CarouselHome";
import { StillsImages } from "../../domain/data";

export function Stills() {
  return (
    <>
      <Title title="¿Qué es un still?" bgType="tomato" />
      <div className="w-full max-w-4xl">
        <p className="text-white pb-6">Abreviación del término en inglés <span style={{ fontStyle: "italic" }}>film still</span>, refiere a una fotografía fija tomada durante una producción de cine. Este tipo de fotografía tiene fines promocionales y puede ser hecha dentro del escenario de rodaje, regularmente es impresa en papel fotográfico e incluye poco diseño o contenido de texto.</p>
        <CarouselHome
          images={StillsImages}
          orientation="left"
        />
        <p className="text-white pb-6">Usualmente servían para enviarse como paquete promocional a los publicistas para que fueran publicados en el periódico
          o alguna revista, también se usaban como base para la creación del cartel. Los fotógrafos de imagen fija de cine contratados
          por las grandes productoras trabajaban también en estudio, se caracterizaban por la alta calidad de su trabajo, además de la
          técnica, debían capturar en una sola imagen la esencia del personaje interpretado. Los retratos eran enviados a los medios
          de comunicación o bien, se imprimían cientos de copias para ser entregados con la firma autógrafa entre sus fans. </p>
        <p className="text-white pb-6">Gabriel Figueroa es el cinefotógrafo más importante de la época de oro del cine mexicano y la mirada que nos presentó un
          México de claroscuros lleno de vida.</p>
        <p className="text-white">El Fondo Filmoteca resguarda varios títulos en los que destaca su participación.</p>
      </div>
    </>
  );
}
