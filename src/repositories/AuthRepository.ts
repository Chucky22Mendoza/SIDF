import { ResponseWrapper } from "@/domain/Response";
import { IUserInfo } from "@/domain/Users";
import { Usuario } from "@prisma/client";

export interface AuthRepository {
  signup: (user: Omit<Usuario, 'id'>) => Promise<ResponseWrapper<undefined>>;
  login: (nickname: string, password: string) => Promise<ResponseWrapper<{ token: string, role: string, user: IUserInfo }>>;
  logout: () => Promise<ResponseWrapper<undefined>>;
}
