export type CatalogsType =
  "archivo" | "caja" |
  "capturista" | "catalogador" |
  "coleccion" | "director" |
  "estante" | "estelar" |
  "fondo" | "genero" |
  "pais" | "produccion" |
  "soporte" | "tecnica" |
  "tipologia" | "ubicacion";

export interface ICatalog {
  id: CatalogsType;
  name: string;
}

export interface ICatalogData {
  id: string;
  name: string;
}

export const catalogs: ICatalog[] = [
  { id: "archivo", name: "Archivo" },
  { id: "caja", name: "Caja" },
  { id: "capturista", name: "Capturista" },
  { id: "catalogador", name: "Catalogador" },
  { id: "coleccion", name: "Colección" },
  { id: "director", name: "Director" },
  { id: "estante", name: "Estante" },
  { id: "estelar", name: "Estelar" },
  { id: "fondo", name: "Fondo" },
  { id: "genero", name: "Género" },
  { id: "pais", name: "País" },
  { id: "produccion", name: "Producción" },
  { id: "soporte", name: "Soporte" },
  { id: "tecnica", name: "Técnica de Impresión" },
  { id: "tipologia", name: "Tipología" },
  { id: "ubicacion", name: "Ubicación" },
];