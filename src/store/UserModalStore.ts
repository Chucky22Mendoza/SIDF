import { create } from "zustand";

export interface IUserModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useUserModalStore = create<IUserModalState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
}));
