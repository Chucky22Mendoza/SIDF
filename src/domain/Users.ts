export interface IRole {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  fullname: string;
  nickname: string;
  email: string;
  rol: IRole;
}

export type UserCreateType = Omit<IUser | 'id', 'rol'> & {
  fk_id_rol: string;
  password: string;
}

export type UserUpdateType = Omit<IUser, 'rol'> & {
  fk_id_rol: string;
  password: string;
}
