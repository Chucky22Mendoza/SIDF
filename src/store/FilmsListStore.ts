import { create } from "zustand";
import { IFilmRow } from "@/domain/Filme";

export interface IFilmsListState {
  list: IFilmRow[];
  setList: (list: IFilmRow[]) => void;
}

export const useFilmsListStore = create<IFilmsListState>((set) => ({
  list: [],
  setList: (list: IFilmRow[]) => set(() => ({ list })),
}));
