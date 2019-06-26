export interface User {
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
