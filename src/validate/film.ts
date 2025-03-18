import { AccesibilityType, CharacteristicsType, DescriptionType, FilmeType } from "@/domain/Filme";

export const validateGeneralTab = (data: FilmeType): boolean => (
  data.titulo !== '' &&
  data.fkIdTipologia !== '' &&
  data.fkIdFondo !== '' &&
  data.fkIdColeccion !== '' &&
  data.fkIdCaja !== '' &&
  data.fkIdEstante !== '' &&
  data.copias > 0 &&
  (
    data.imagen1 !== '' ||
    data.imagen2 !== '' ||
    data.imagen3 !== ''
  )
);

export const validateDescriptionTab = (data: DescriptionType): boolean => (
  data.yearRelease >= 1920 &&
  data.fkIdPais !== '' &&
  data.directors.length > 0 &&
  data.genders.length > 0 &&
  data.productions.length > 0 &&
  data.stars.length > 0
);

export const validateCharacteristicsTab = (data: CharacteristicsType): boolean => (
  data.alto > 0 &&
  data.ancho > 0 &&
  data.fkIdSoporte !== '' &&
  data.fkIdTecnica !== ''
);

export const validateAccesibilityTab = (data: AccesibilityType): boolean => (
  data.fkIdArchivo !== '' &&
  data.fkIdCapturista !== '' &&
  data.fkIdCatalogador !== '' &&
  data.yearCataloging > 2000
);
