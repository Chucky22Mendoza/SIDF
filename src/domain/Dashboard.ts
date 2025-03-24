export interface IDashboardResponse {
  films: number;
  copies: number;
  available: number;
  loans: number;
  returns: number;
  loan_films: ILoanFilms[];
  loans_graph: IGraph[];
  returns_graph: IGraph[];
  fondos_graph: IPieGraph[];
  typologies_graph: IPieGraph[];
  collections_graph: IPieGraph[];
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

export interface IPieGraph {
  name: string;
  total: number;
}
