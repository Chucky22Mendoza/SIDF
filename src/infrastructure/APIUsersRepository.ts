import { ResponseWrapper } from "@/domain/Response";
import { IUser, UserCreateType, UserUpdateType } from "@/domain/Users";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { UsersRepository } from "@/repositories/UsersRepository";

export class APIUsersRepository implements UsersRepository {
  async getAll(): Promise<ResponseWrapper<IUser[]>> {
    return await fetchWithAuth<IUser[]>(`/api/admin/users`);
  }

  async search(query: string): Promise<ResponseWrapper<IUser[]>> {
    return await fetchWithAuth<IUser[]>(`/api/admin/users/search?q=${query}`);
  }

  async create(user: UserCreateType): Promise<ResponseWrapper<string>> {
    return await fetchWithAuth<string>(`/api/admin/users`, {
      method: "POST",
      body: JSON.stringify(user),
    });
  }

  async update(user: UserUpdateType): Promise<ResponseWrapper<void>> {
    return await fetchWithAuth<void>(`/api/admin/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });
  }

  async delete(id: string): Promise<ResponseWrapper<void>> {
    return await fetchWithAuth<void>(`/api/admin/users/${id}`, {
      method: "DELETE",
    });
  }
}
