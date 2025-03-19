import { DashboardRepository } from '@/repositories/DashboardRepository';
import { APIDashboardRepository } from '@/infrastructure/APIDashboardRepository';
import { useDashboardStore } from '@/store/DashboardStore';

export interface IUseDashboard {
  get: () => Promise<void>;
}

export const useDashboard = (): IUseDashboard => {
  const setDashboard = useDashboardStore((state) => state.setDashboard);
  const dashboardRepository: DashboardRepository = new APIDashboardRepository();

  const get = async (): Promise<void> => {
    const { data, success } = await dashboardRepository.get();
    if (success && data) {
      setDashboard(data);
    }
  };

  return {
    get,
  };
};
