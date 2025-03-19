import { create } from "zustand";
import { IDashboardResponse } from "@/domain/Dashboard";

export const defaultDashboard: IDashboardResponse = {
  films: 0,
  copies: 0,
  available: 0,
  loans: 0,
  returns: 0,
};

export interface IDashboardState {
  dashboard: IDashboardResponse;
  setDashboard: (dashboard: IDashboardResponse) => void;
}

export const useDashboardStore = create<IDashboardState>((set) => ({
  dashboard: defaultDashboard,
  setDashboard: (dashboard: IDashboardResponse) => set(() => ({ dashboard })),
}));
