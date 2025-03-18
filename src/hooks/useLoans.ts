import { ResponseWrapper } from '@/domain/Response';
import { useLoansListStore } from '@/store/LoansListStore';
import { LoansRepository } from '@/repositories/LoansRepository';
import { APILoansRepository } from '@/infrastructure/APILoansRepository';
import { IFilterHistory, ILoan, LoanDataType } from '@/domain/Loans';

export interface IUseLoans {
  get: () => Promise<ILoan[]>;
  performHistory: (filters: IFilterHistory) => Promise<void>;
  performSearch: (query: string) => Promise<void>;
  performPost: (data: LoanDataType) => Promise<ResponseWrapper<string>>;
  performPut: (id: string, data: LoanDataType) => Promise<ResponseWrapper<void>>;
  performDelete: (id: string) => Promise<ResponseWrapper<void>>;
}

export const useLoans = (): IUseLoans => {
  const setList = useLoansListStore((state) => state.setList);
  const setHistory = useLoansListStore((state) => state.setHistory);
  const loansRepository: LoansRepository = new APILoansRepository();

  const get = async (): Promise<ILoan[]> => {
    const { data, success } = await loansRepository.getAll();
    if (success && data) {
      setList(data);
      return data;
    }
    return [];
  };

  const performHistory = async (filters: IFilterHistory): Promise<void> => {
    const { data, success } = await loansRepository.history(filters);
    if (success && data) {
      setHistory(data);
      return;
    }
    setHistory([]);
  };

  const performSearch = async (query: string): Promise<void> => {
    const { data, success } = await loansRepository.search(query);
    if (success && data) {
      setList(data);
    }
  };

  const performPost = async (data: LoanDataType): Promise<ResponseWrapper<string>> => (
    await loansRepository.create(data)
  );

  const performPut = async (id: string, data: LoanDataType): Promise<ResponseWrapper<void>> => (
    await loansRepository.update(id, data)
  );

  const performDelete = async (id: string): Promise<ResponseWrapper<void>> => (
    await loansRepository.delete(id)
  );

  return {
    get,
    performHistory,
    performSearch,
    performPost,
    performPut,
    performDelete,
  };
};
