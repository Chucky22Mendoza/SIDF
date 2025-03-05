import { ResponseWrapper } from '@/domain/Response';
import { useUsersListStore } from '@/store/UsersListStore';
import { APIUsersRepository } from '@/infrastructure/APIUsersRepository';
import { UsersRepository } from '@/repositories/UsersRepository';
import { UserCreateType, UserUpdateType } from "@/domain/Users";

export interface IUseUsers {
  get: () => Promise<void>;
  performSearch: (query: string) => Promise<void>;
  performPost: (user: UserCreateType) => Promise<ResponseWrapper<string>>;
  performPut: (user: UserUpdateType) => Promise<ResponseWrapper<void>>;
  performDelete: (id: string) => Promise<ResponseWrapper<void>>;
}

export const useUsers = (): IUseUsers => {
  const setUsers = useUsersListStore((state) => state.setUsers);
  const usersRepository: UsersRepository = new APIUsersRepository();

  const get = async (): Promise<void> => {
    const { data, success } = await usersRepository.getAll();
    if (success && data) {
      setUsers(data);
    }
  };

  const performSearch = async (query: string): Promise<void> => {
    const { data, success } = await usersRepository.search(query);
    if (success && data) {
      setUsers(data);
    }
  };

  const performPost = async (user: UserCreateType): Promise<ResponseWrapper<string>> => (
    await usersRepository.create(user)
  );

  const performPut = async (user: UserUpdateType): Promise<ResponseWrapper<void>> => (
    await usersRepository.update(user)
  );

  const performDelete = async (id: string): Promise<ResponseWrapper<void>> => (
    await usersRepository.delete(id)
  );

  return {
    get,
    performSearch,
    performPost,
    performPut,
    performDelete,
  };
};
