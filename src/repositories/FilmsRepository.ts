import { IFilm, IFilmRow, IFilmView } from "@/domain/Filme";
import { ResponseWrapper } from "@/domain/Response";

export interface FilmsRepository {
  getAll: () => Promise<ResponseWrapper<IFilmRow[]>>;
  create: (data: IFilm) => Promise<ResponseWrapper<string>>;
  update: (id: string, data: IFilm) => Promise<ResponseWrapper<void>>;
  delete: (id: string) => Promise<ResponseWrapper<void>>;
  search: (query: string) => Promise<ResponseWrapper<IFilmRow[]>>;
  getAllViewer: () => Promise<ResponseWrapper<IFilmView[]>>;
  searchViewer: (query: string) => Promise<ResponseWrapper<IFilmView[]>>;
  getOneViewer: (id: string) => Promise<ResponseWrapper<IFilmView>>;
}
