import React, { useState } from 'react'
import { ResponseWrapper } from '@/domain/Response';
import { APIAuthRepository } from '@/infrastructure/APIAuthRepository';
import { IUserInfo } from '@/domain/Users';

interface IUseLoginForm {
  nickname: string;
  password: string;
  isSubmitted: boolean;
  handleNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<ResponseWrapper<{ token: string, role: string, user: IUserInfo }>>;
  handleLogOut: () => Promise<ResponseWrapper<undefined>>;
}

export function useLoginForm(): IUseLoginForm {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const apiAuthRepository = new APIAuthRepository();

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<ResponseWrapper<{ token: string, role: string, user: IUserInfo }>> => {
    event.preventDefault();
    setIsSubmitted(true);
    const response = await apiAuthRepository.login(nickname, password);
    setIsSubmitted(false);
    return response;
  };

  const handleLogOut = async (): Promise<ResponseWrapper<undefined>> => {
    return await apiAuthRepository.logout();
  };

  return {
    nickname,
    password,
    isSubmitted,
    handleNicknameChange,
    handlePasswordChange,
    handleSubmit,
    handleLogOut,
  };
}
