import { DashboardRepository } from '@/repositories/DashboardRepository';
import { APIDashboardRepository } from '@/infrastructure/APIDashboardRepository';
import { useDashboardStore } from '@/store/DashboardStore';

export interface IUseDashboard {
  get: (start_date: string, end_date: string) => Promise<void>;
}

export const useDashboard = (): IUseDashboard => {
  const setDashboard = useDashboardStore((state) => state.setDashboard);
  const dashboardRepository: DashboardRepository = new APIDashboardRepository();

  const get = async (start_date: string, end_date: string): Promise<void> => {
    const { data, success } = await dashboardRepository.get(start_date, end_date);
    if (success && data) {
      setDashboard(data);
    }
  };

  return {
    get,
  };
};
