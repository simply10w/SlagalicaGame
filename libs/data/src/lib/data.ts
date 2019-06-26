export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  occupation: string;
  userName: string;
  gender: string;
  dateOfBirth: Date | string;
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
