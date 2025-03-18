export interface ILoan {
  id: string;
  name: string;
  phone: string;
  email: string;
  curp: string;
  filme: string;
  fk_id_filme: string;
  date: Date | null;
}

export type LoanHistoryType = Omit<ILoan, 'fk_id_filme' | 'date'> & {
  loanDate: Date | null,
  returnDate: Date | null,
  status: 'En préstamo' | 'Devuelto',
}

export interface IFilterHistory {
  filter: 'createdAt' | 'deletedAt',
  startDate: string,
  endDate: string,
  query?: string,
};

export type LoanDataType = Omit<ILoan, 'id' | 'filme' | 'date'>;

