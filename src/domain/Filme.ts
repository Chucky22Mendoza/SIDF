import { Accesibilidad, Caracteristicas, Descripcion, Filme } from "@prisma/client";

export interface IFilmRow {
  id: string;
  title: string;
  director: string;
  year: number;
  gender: string;
  copies: string;
}

export interface IFilmView {
  id: string;
  copies: number;
  title: string;
  directors: string;
  genders: string;
  productions: string;
  stars: string;
  isDigital: boolean;
  isReproductional: boolean;
  isConsutation: boolean;
  images: string[];
  archive: string;
  fondo: string;
}

export type FilmeType = Omit<
  Filme,
  'copias_disponibles' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'
>;

export type DescriptionType = Omit<
  Descripcion,
  'createdAt' | 'updatedAt' | 'deletedAt' | 'id' | 'fkIdFilme'
> & {
  directors: string[];
  stars: string[];
  genders: string[];
  productions: string[];
};

export type CharacteristicsType = Omit<
  Caracteristicas,
  'createdAt' | 'updatedAt' | 'deletedAt' | 'id' | 'fkIdFilme' | 'alto' | 'ancho'
> & {
  alto: number;
  ancho: number;
};

export type AccesibilityType = Omit<
  Accesibilidad,
  'createdAt' | 'updatedAt' | 'deletedAt' | 'id' | 'fkIdFilme'
>;

export interface IFilm {
  general: FilmeType,
  description: DescriptionType,
  characteristics: CharacteristicsType,
  accesibility: AccesibilityType,
};
