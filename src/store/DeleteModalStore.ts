import { create } from "zustand";

export interface IDeleteModalStore {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onConfirmCallback: (onConfirm: () => void) => void;
  onCancelCallback: (onCancel: () => void) => void;
  setOpen: (isOpen: boolean) => void;
}

export const useDeleteModalStore = create<IDeleteModalStore>((set) => ({
  isOpen: false,
  onConfirm: () => {},
  onCancel: () => {},
  onConfirmCallback: (onConfirm: () => void) => set(() => ({ onConfirm })),
  onCancelCallback: (onCancel: () => void) => set(() => ({ onCancel })),
  setOpen: (isOpen: boolean) => set(() => ({ isOpen })),
}));
