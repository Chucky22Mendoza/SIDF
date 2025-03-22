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
  getViewer: () => Promise<void>;
  performViewerSearch: (query: string) => Promise<void>;
  performFilm: (id: string) => Promise<void>;
  getPublicViewer: () => Promise<void>;
  performPublicViewerSearch: (query: string) => Promise<void>;
  performPublicFilm: (id: string) => Promise<void>;
}

export const useFilms = (): IUseFilms => {
  const setList = useFilmsListStore((state) => state.setList);
  const setViewer = useFilmsListStore((state) => state.setViewer);
  const setFilm = useFilmsListStore((state) => state.setFilm);
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

  const getViewer = async (): Promise<void> => {
    const { data, success } = await filmsRepository.getAllViewer();
    if (success && data) {
      setViewer(data);
    }
  };

  const performViewerSearch = async (query: string): Promise<void> => {
    const { data, success } = await filmsRepository.searchViewer(query);
    if (success && data) {
      setViewer(data);
    }
  };

  const performFilm = async (id: string): Promise<void> => {
    const { data, success } = await filmsRepository.getOneViewer(id);
    if (success && data) {
      setFilm(data);
    }
  };

  const getPublicViewer = async (): Promise<void> => {
    const { data, success } = await filmsRepository.getAllPublicViewer();
    if (success && data) {
      setViewer(data);
    }
  };

  const performPublicViewerSearch = async (query: string): Promise<void> => {
    const { data, success } = await filmsRepository.searchPublicViewer(query);
    if (success && data) {
      setViewer(data);
    }
  };

  const performPublicFilm = async (id: string): Promise<void> => {
    const { data, success } = await filmsRepository.getOnePublicViewer(id);
    if (success && data) {
      setFilm(data);
    }
  };

  return {
    get,
    performSearch,
    performPost,
    performPut,
    performDelete,
    getViewer,
    performFilm,
    performViewerSearch,
    getPublicViewer,
    performPublicViewerSearch,
    performPublicFilm,
  };
};
