import React from 'react'
import { ResponseWrapper } from '@/domain/Response';
import { APIAuthRepository } from '@/infrastructure/APIAuthRepository';

interface IUseLoginForm {
  nickname: string;
  password: string;
  handleNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<ResponseWrapper<{ token: string, role: string, userId: string }>>;
  handleLogOut: () => Promise<ResponseWrapper<undefined>>;
}

export function useLoginForm(): IUseLoginForm {
  const [nickname, setNickname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const apiAuthRepository = new APIAuthRepository();

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<ResponseWrapper<{ token: string, role: string, userId: string }>> => {
    event.preventDefault();
    return await apiAuthRepository.login(nickname, password);
  };

  const handleLogOut = async (): Promise<ResponseWrapper<undefined>> => {
    return await apiAuthRepository.logout();
  };

  return {
    nickname,
    password,
    handleNicknameChange,
    handlePasswordChange,
    handleSubmit,
    handleLogOut,
  };
}
