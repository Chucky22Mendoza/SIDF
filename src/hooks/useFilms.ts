import { IFilm, IFilmRow } from '@/domain/Filme';
import { useFilmsListStore } from '@/store/FilmsListStore';
import { APIFilmsRepository } from '@/infrastructure/APIFilmsRepository';
import { FilmsRepository } from '@/repositories/FilmsRepository';
import { ResponseWrapper } from '@/domain/Response';

export interface IUseFilms {
  get: () => Promise<IFilmRow[]>;
  performSearch: (query: string) => Promise<void>;
  performPost: (data: IFilm) => Promise<ResponseWrapper<string>>;
  performPut: (id: string, data: IFilm) => Promise<ResponseWrapper<void>>;
  performDelete: (id: string) => Promise<ResponseWrapper<void>>;
}

export const useFilms = (): IUseFilms => {
  const setList = useFilmsListStore((state) => state.setList);
  const filmsRepository: FilmsRepository = new APIFilmsRepository();

  const get = async (): Promise<IFilmRow[]> => {
    const { data, success } = await filmsRepository.getAll();
    if (success && data) {
      setList(data);
      return data;
    }
    return [];
  };

  const performSearch = async (query: string): Promise<void> => {
    const { data, success } = await filmsRepository.search(query);
    if (success && data) {
      setList(data);
    }
  };

  const performPost = async (data: IFilm): Promise<ResponseWrapper<string>> => (
    await filmsRepository.create(data)
  );

  const performPut = async (id: string, data: IFilm): Promise<ResponseWrapper<void>> => (
    await filmsRepository.update(id, data)
  );

  const performDelete = async (id: string): Promise<ResponseWrapper<void>> => (
    await filmsRepository.delete(id)
  );

  return {
    get,
    performSearch,
    performPost,
    performPut,
    performDelete,
  };
};
