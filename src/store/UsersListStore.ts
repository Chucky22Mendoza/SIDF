import { create } from "zustand";
import { IUser } from "@/domain/Users";

export interface IUsersListState {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

export const useUsersListStore = create<IUsersListState>((set) => ({
  users: [],
  setUsers: (users: IUser[]) => set(() => ({ users })),
}));
