import { IUserInfo } from "@/domain/Users";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IRoleUserLoggedState {
  roleId: string | null;
  user: IUserInfo | null;
  setRole: (roleId: string | null) => void;
  setUser: (user: IUserInfo | null) => void;
}

export const useRoleUserLoggedStore = create(persist<IRoleUserLoggedState>((set) => ({
  roleId: null,
  user: null,
  setRole: (roleId: string | null) => set(() => ({ roleId })),
  setUser: (user: IUserInfo | null) => set(() => ({ user })),
}), {
  name: 'role-user-logged',
}));
