import { IDashboardResponse } from "@/domain/Dashboard";
import { ResponseWrapper } from "@/domain/Response";

export interface DashboardRepository {
  get: () => Promise<ResponseWrapper<IDashboardResponse>>;
}
