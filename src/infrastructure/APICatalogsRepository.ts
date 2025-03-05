import { CatalogsType, ICatalogData } from "@/domain/Catalogs";
import { ResponseWrapper } from "@/domain/Response";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { CatalogsRepository } from "@/repositories/CatalogsRepository";

export class APICatalogsRepository implements CatalogsRepository {
  async getAll(catalog: CatalogsType): Promise<ResponseWrapper<ICatalogData[]>> {
    return await fetchWithAuth<ICatalogData[]>(`/api/admin/catalogs/${catalog}`);
  }

  async search(catalog: CatalogsType, query: string): Promise<ResponseWrapper<ICatalogData[]>> {
    return await fetchWithAuth<ICatalogData[]>(`/api/admin/catalogs/${catalog}/search?q=${query}`);
  }

  async create(catalog: CatalogsType, name: string): Promise<ResponseWrapper<string>> {
    return await fetchWithAuth<string>(`/api/admin/catalogs/${catalog}`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  }

  async update(catalog: CatalogsType, item: ICatalogData): Promise<ResponseWrapper<void>> {
    return await fetchWithAuth<void>(`/api/admin/catalogs/${catalog}/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ name: item.name }),
    });
  }

  async delete(catalog: CatalogsType, id: string): Promise<ResponseWrapper<void>> {
    return await fetchWithAuth<void>(`/api/admin/catalogs/${catalog}/${id}`, {
      method: "DELETE",
    });
  }
}
