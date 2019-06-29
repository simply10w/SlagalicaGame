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
  created_at: string;
  updated_at: string;
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

export interface AsocijacijaGame {
  _id: string;
  groups: AsocijacijaGroup[];
  solutions: string[];
}

export interface AsocijacijaGroup {
  _id: string;
  hints: string[];
  solutions: string[];
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

export interface ResetPasswordDto {
  userName: string;
  newPassword: string;
  currentPassword: string;
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

export interface ErrorDto {
  error: string;
}

export enum PlayerRole {
  Red = 'red',
  Blue = 'blue'
}

export interface Game {
  [PlayerRole.Blue]: GamePlayedPlayerRole;
  [PlayerRole.Red]: GamePlayedPlayerRole;
  won: PlayerRole;
  played_at?: string;
}

interface GamePlayedPlayerRole {
  player: User;
  points: number;
}

export const WS_GAME_ROOM = 'game_room';
