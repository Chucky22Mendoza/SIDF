import { IDashboardResponse } from "@/domain/Dashboard";
import { ResponseWrapper } from "@/domain/Response";

export interface DashboardRepository {
  get: (start_date: string, end_date: string) => Promise<ResponseWrapper<IDashboardResponse>>;
}
