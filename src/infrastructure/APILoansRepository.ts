import { IFilterHistory, ILoan, LoanDataType, LoanHistoryType } from "@/domain/Loans";
import { ResponseWrapper } from "@/domain/Response";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { LoansRepository } from "@/repositories/LoansRepository";

export class APILoansRepository implements LoansRepository {
  async getAll(): Promise<ResponseWrapper<ILoan[]>> {
    return await fetchWithAuth<ILoan[]>(`/api/admin/film/loans`);
  }

  async history(filters: IFilterHistory): Promise<ResponseWrapper<LoanHistoryType[]>> {
    return await fetchWithAuth<LoanHistoryType[]>(`/api/admin/film/loans/history`, {
      method: 'POST',
      body: JSON.stringify(filters),
    });
  }

  async search(query: string): Promise<ResponseWrapper<ILoan[]>> {
    return await fetchWithAuth<ILoan[]>(`/api/admin/film/loans/search?q=${query}`);
  }

  async create(data: LoanDataType): Promise<ResponseWrapper<string>> {
    return await fetchWithAuth<string>(`/api/admin/film/loans`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async update(id: string, data: LoanDataType): Promise<ResponseWrapper<void>> {
    return await fetchWithAuth<void>(`/api/admin/film/loans/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete(id: string): Promise<ResponseWrapper<void>> {
    return await fetchWithAuth<void>(`/api/admin/film/loans/${id}`, {
      method: "DELETE",
    });
  }
}
