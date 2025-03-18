import { IFilm, IFilmRow } from "@/domain/Filme";
import { ResponseWrapper } from "@/domain/Response";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { FilmsRepository } from "@/repositories/FilmsRepository";

export class APIFilmsRepository implements FilmsRepository {
  async getAll(): Promise<ResponseWrapper<IFilmRow[]>> {
    return await fetchWithAuth<IFilmRow[]>(`/api/admin/film`);
  }

  async search(query: string): Promise<ResponseWrapper<IFilmRow[]>> {
    return await fetchWithAuth<IFilmRow[]>(`/api/admin/film/search?q=${query}`);
  }

  async create(data: IFilm): Promise<ResponseWrapper<string>> {
    return await fetchWithAuth<string>(`/api/admin/film`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async update(id: string, data: IFilm): Promise<ResponseWrapper<void>> {
    return await fetchWithAuth<void>(`/api/admin/film/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete(id: string): Promise<ResponseWrapper<void>> {
    return await fetchWithAuth<void>(`/api/admin/film/${id}`, {
      method: "DELETE",
    });
  }
}
