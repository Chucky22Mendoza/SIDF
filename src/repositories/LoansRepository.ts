import { LoanDataType, ILoan, IFilterHistory, LoanHistoryType } from "@/domain/Loans";
import { ResponseWrapper } from "@/domain/Response";

export interface LoansRepository {
  getAll: () => Promise<ResponseWrapper<ILoan[]>>;
  create: (data: LoanDataType) => Promise<ResponseWrapper<string>>;
  update: (id: string, data: LoanDataType) => Promise<ResponseWrapper<void>>;
  delete: (id: string) => Promise<ResponseWrapper<void>>;
  search: (query: string) => Promise<ResponseWrapper<ILoan[]>>;
  history: (filters: IFilterHistory) => Promise<ResponseWrapper<LoanHistoryType[]>>;
}

