import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IRoleUserLoggedState {
  roleId: string | null;
  userId: string | null;
  setRole: (roleId: string | null) => void;
  setUserId: (userId: string | null) => void;
}

export const useRoleUserLoggedStore = create(persist<IRoleUserLoggedState>((set) => ({
  roleId: null,
  userId: null,
  setRole: (roleId: string | null) => set(() => ({ roleId })),
  setUserId: (userId: string | null) => set(() => ({ userId })),
}), {
  name: 'role-user-logged',
}));
