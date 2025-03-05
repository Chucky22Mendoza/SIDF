import { ResponseWrapper } from "@/domain/Response";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { AuthRepository } from "@/repositories/AuthRepository";
import { Usuario } from "@prisma/client";

export class APIAuthRepository implements AuthRepository {
  async signup(user: Omit<Usuario, 'id'>): Promise<ResponseWrapper<undefined>> {
    return await fetchWithAuth('/api/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async login(nickname: string, password: string): Promise<ResponseWrapper<{ token: string, role: string, userId: string }>> {
    return await fetchWithAuth('/api/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify({
        nickname,
        password,
      }),
    });
  }

  async logout(): Promise<ResponseWrapper<undefined>> {
    return await fetchWithAuth('/api/auth/log-out', {
      method: 'GET',
    });
  }
}
