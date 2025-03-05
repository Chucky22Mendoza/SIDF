import { create } from "zustand";
import { ICatalogData } from "@/domain/Catalogs";

export interface ICatalogsListState {
  list: ICatalogData[];
  setList: (list: ICatalogData[]) => void;
}

export const useCatalogsListStore = create<ICatalogsListState>((set) => ({
  list: [],
  setList: (list: ICatalogData[]) => set(() => ({ list })),
}));
