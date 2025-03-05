import { ResponseWrapper } from "@/domain/Response";
import { Usuario } from "@prisma/client";

export interface AuthRepository {
  signup: (user: Omit<Usuario, 'id'>) => Promise<ResponseWrapper<undefined>>;
  login: (nickname: string, password: string) => Promise<ResponseWrapper<{ token: string, role: string, userId: string }>>;
  logout: () => Promise<ResponseWrapper<undefined>>;
}
