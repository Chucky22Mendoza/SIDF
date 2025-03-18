import { create } from "zustand";
import { ILoan, LoanHistoryType } from "@/domain/Loans";

export interface ILoansListState {
  list: ILoan[];
  history: LoanHistoryType[];
  setList: (list: ILoan[]) => void;
  setHistory: (history: LoanHistoryType[]) => void;
}

export const useLoansListStore = create<ILoansListState>((set) => ({
  list: [],
  history: [],
  setList: (list: ILoan[]) => set(() => ({ list })),
  setHistory: (history: LoanHistoryType[]) => set(() => ({ history })),
}));
