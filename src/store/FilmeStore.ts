import { create } from "zustand";
import { AccesibilityType, CharacteristicsType, DescriptionType, FilmeType } from "@/domain/Filme";

export const generalDefault: FilmeType = {
  copias: 0,
  titulo: '',
  articulo: '',
  fkIdCaja: '',
  fkIdColeccion: '',
  fkIdEstante: '',
  fkIdFondo: '',
  fkIdTipologia: '',
  imagen1: '',
  imagen2: '',
  imagen3: '',
};

export const descriptionDefault: DescriptionType = {
  fkIdPais: '',
  yearRelease: 1920,
  directors: [],
  stars: [],
  genders: [],
  productions: [],
};

export const characteristicsDefault: CharacteristicsType = {
  alto: 0,
  ancho: 0,
  fkIdSoporte: '',
  fkIdTecnica: '',
  tipoMedida: 'CM',
};

export const accesibilityDefault: AccesibilityType = {
  consulta: true,
  reproduccionDigital: true,
  reproduccion: true,
  fkIdArchivo: '',
  fkIdCapturista: '',
  fkIdCatalogador: '',
  observaciones: '',
  yearCataloging: new Date().getFullYear(),
  organizacionPrevia: null,
};

export interface IFilmeState {
  filmeId: string | undefined;
  general: FilmeType;
  description: DescriptionType;
  characteristics: CharacteristicsType;
  accesibility: AccesibilityType;
  setFilmeId: (id: string | undefined) => void;
  setGeneral: (general: FilmeType) => void;
  setDescription: (description: DescriptionType) => void;
  setCharacteristics: (characteristics: CharacteristicsType) => void;
  setAccesibility: (accesibility: AccesibilityType) => void;
}

export const useFilmeStore = create<IFilmeState>((set) => ({
  filmeId: undefined,
  general: generalDefault,
  description: descriptionDefault,
  characteristics: characteristicsDefault,
  accesibility: accesibilityDefault,
  setFilmeId: (filmeId: string | undefined) => set({ filmeId }),
  setGeneral: (general: FilmeType) => set({ general }),
  setDescription: (description: DescriptionType) => set({ description }),
  setCharacteristics: (characteristics: CharacteristicsType) => set({ characteristics }),
  setAccesibility: (accesibility: AccesibilityType) => set({ accesibility }),
}));
