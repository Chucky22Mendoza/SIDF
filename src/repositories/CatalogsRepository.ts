import { CatalogsType, ICatalogData } from "@/domain/Catalogs";
import { ResponseWrapper } from "@/domain/Response";

export interface CatalogsRepository {
  getAll: (catalog: CatalogsType) => Promise<ResponseWrapper<ICatalogData[]>>;
  create: (catalog: CatalogsType, name: string) => Promise<ResponseWrapper<string>>;
  update: (catalog: CatalogsType, item: ICatalogData) => Promise<ResponseWrapper<void>>;
  delete: (catalog: CatalogsType, id: string) => Promise<ResponseWrapper<void>>;
  search: (catalog: CatalogsType, query: string) => Promise<ResponseWrapper<ICatalogData[]>>;
}
