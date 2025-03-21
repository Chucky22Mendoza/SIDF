import { IDashboardResponse } from "@/domain/Dashboard";
import { ResponseWrapper } from "@/domain/Response";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { DashboardRepository } from "@/repositories/DashboardRepository";

export class APIDashboardRepository implements DashboardRepository {
  async get(start_date: string, end_date: string): Promise<ResponseWrapper<IDashboardResponse>> {
    return await fetchWithAuth<IDashboardResponse>('/api/admin/dashboard', {
      method: 'POST',
      body: JSON.stringify({ start_date, end_date }),
    });
  }
}
