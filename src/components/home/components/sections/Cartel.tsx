import { Title } from "./Title";
import { CarouselHome } from "./CarouselHome";
import { CartelImages } from "../../domain/data";

export function Cartel() {
  return (
    <>
      <Title title="¿Qué es un Cartel?" bgType="tomato" />
      <div className="w-full max-w-4xl">
        <p className="text-white pb-6">
          Se entiende por cartel todo aquel medio gráfico impreso en papel a una cara, regularmente en gran tamaño, compuesto por imágenes, textos o ambos a la vez y que se exhibe en  lugares públicos transitados con fines publicitarios e informativos, o bien, la difusión de algún producto como lo es una película.  El cartel cinematográfico tiene su origen en el Siglo XIX, desde la misma invención del cine, dado el éxito del cartel publicitario, el cine encontró el medio ideal para publicitar sus películas y atraer más espectadores.
          En un principio, el cartel cinematográfico se enfocaba a difundir la invención del cine, para la década de 1920, el contenido textual cobra fuerza al incluir el nombre de los estelares, el director y la casa productora; la tipografía por ejemplo, se asociaba con el género de la película, creando diseños exclusivos y llamativos que ahora son clásicos. Sin embargo, tanto los nombres como la imagen de los actores estelares eran la atracción principal, sobre todo a partir de la década de los años treinta, la época de oro para el cine de  Hollywood.
        </p>
        <CarouselHome
          images={CartelImages}
          orientation="left"
        />
        <p className="text-white pb-6">
          El diseño de un cartel cinematográfico es más complejo de lo que parece, en él, se condensa toda la idea en conjunto de un filme a través de una auténtica labor de síntesis de los elementos más representativos, usando solo dos recursos: imagen y texto. El valor estético de un cartel es fundamental en cuanto a la creación de un mensaje, su estructura mixta posibilita persuadir al espectador a asistir a un espectáculo que compite en precio con otras películas en cartelera, por lo que el contenido debe impactar visualmente y
          mantener al espectador el mayor tiempo posible observando los detalles del mismo. Poco a poco, paralelo al crecimiento de la industria cinematográfica, se fueron integrando más datos a los carteles, entre ellos, premios y actuaciones especiales, a la vez que la firma del cartelista fue desapareciendo por distintas razones como las regulaciones de algunas casas productoras o los artistas se decidían por el anonimato para no involucrar su nombre con el contenido político o social del filme. Con el tiempo, la autoría pasó a manos de las agencias
          publicitarias y el cartelista se convirtió en diseñador gráfico, el offset sustituyó a la serigrafía y así,  como en otras artes, las técnicas y procesos cambiaron, otorgando valor documental e histórico a todo material gráfico que surge del proceso de producción y difusión de un filme.
        </p>
      </div>
    </>
  );
}