import { create } from "zustand";
import { IFilmRow, IFilmView } from "@/domain/Filme";

export interface IFilmsListState {
  list: IFilmRow[];
  viewer: IFilmView[];
  film: IFilmView | null;
  setList: (list: IFilmRow[]) => void;
  setViewer: (viewer: IFilmView[]) => void;
  setFilm: (film: IFilmView) => void;
}

export const useFilmsListStore = create<IFilmsListState>((set) => ({
  list: [],
  viewer: [],
  film: null,
  setList: (list: IFilmRow[]) => set(() => ({ list })),
  setViewer: (viewer: IFilmView[]) => set(() => ({ viewer })),
  setFilm: (film: IFilmView) => set(() => ({ film })),
}));
