export interface IDashboardResponse {
  films: number;
  copies: number;
  available: number;
  loans: number;
  returns: number;
  loan_films: ILoanFilms[];
  loans_graph: IGraph[];
  returns_graph: IGraph[];
}

export interface ILoanFilms {
  id: string;
  title: string;
  total: number;
}

export interface IGraph {
  month: string;
  total: number;
}
