export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  occupation: string;
  userName: string;
  gender: UserGender;
  dateOfBirth: Date | string;
  type: UserType;
  profileImgUrl: string;
  accepted: boolean;
}

export interface Word {
  _id: string;
  word: string;
}

export interface SpojnicaGame {
  _id: string;
  description: string;
  pairs: SpojnicaPair[];
}

export interface SpojnicaPair {
  _id: string;
  left: string;
  right: string;
}

export enum UserType {
  Supervizor = 'supervizor',
  Admin = 'admin',
  Igrac = 'igrac'
}

export enum UserGender {
  Male = 'male',
  Female = 'female'
}

export interface LoginDto {
  userName: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  occupation: string;
  userName: string;
  gender: UserGender;
  dateOfBirth: string;
  profileImage: File;
}
