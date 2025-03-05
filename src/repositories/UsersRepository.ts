import { ResponseWrapper } from "@/domain/Response";
import { IUser, UserCreateType, UserUpdateType } from "@/domain/Users";

export interface UsersRepository {
  getAll: () => Promise<ResponseWrapper<IUser[]>>;
  create: (user: UserCreateType) => Promise<ResponseWrapper<string>>;
  update: (user: UserUpdateType) => Promise<ResponseWrapper<void>>;
  delete: (id: string) => Promise<ResponseWrapper<void>>;
  search: (query: string) => Promise<ResponseWrapper<IUser[]>>;
}
