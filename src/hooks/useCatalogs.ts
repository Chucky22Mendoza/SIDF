import { CatalogsRepository } from './../repositories/CatalogsRepository';
import { CatalogsType, ICatalogData } from "@/domain/Catalogs";
import { APICatalogsRepository } from '@/infrastructure/APICatalogsRepository';
import { ResponseWrapper } from '@/domain/Response';
import { useCatalogsListStore } from '@/store/CatalogsListStore';

export interface IUseCatalogs {
  get: (catalog: CatalogsType) => Promise<void>;
  performSearch: (catalog: CatalogsType, query: string) => Promise<void>;
  performPost: (catalog: CatalogsType, name: string) => Promise<ResponseWrapper<string>>;
  performPut: (catalog: CatalogsType, catalogData: ICatalogData) => Promise<ResponseWrapper<void>>;
  performDelete: (catalog: CatalogsType, id: string) => Promise<ResponseWrapper<void>>;
}

export const useCatalogs = (): IUseCatalogs => {
  const setList = useCatalogsListStore((state) => state.setList);
  const catalogsRepository: CatalogsRepository = new APICatalogsRepository();

  const get = async (catalog: CatalogsType): Promise<void> => {
    const { data, success } = await catalogsRepository.getAll(catalog);
    if (success && data) {
      setList(data);
    }
  };

  const performSearch = async (catalog: CatalogsType, query: string): Promise<void> => {
    const { data, success } = await catalogsRepository.search(catalog, query);
    if (success && data) {
      setList(data);
    }
  };

  const performPost = async (catalog: CatalogsType, name: string): Promise<ResponseWrapper<string>> => (
    await catalogsRepository.create(catalog, name)
  );

  const performPut = async (catalog: CatalogsType, catalogData: ICatalogData): Promise<ResponseWrapper<void>> => (
    await catalogsRepository.update(catalog, catalogData)
  );

  const performDelete = async (catalog: CatalogsType, id: string): Promise<ResponseWrapper<void>> => (
    await catalogsRepository.delete(catalog, id)
  );

  return {
    get,
    performSearch,
    performPost,
    performPut,
    performDelete,
  };
};
