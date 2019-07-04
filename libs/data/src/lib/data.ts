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

export enum GameType {
  NotStarted = 'not_started',
  Finished = 'finished',
  Asocijacije = 'asocijacije',
  Skocko = 'skocko',
  Spojnice = 'spojnice',
  Slagalica = 'slagalica',
  MojBroj = 'moj_broj'
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

export enum GameWinner {
  Red = 'red',
  Blue = 'blue',
  None = 'none',
  Both = 'both'
}

export enum Skocko {
  Tref = 'tref',
  Pik = 'pik',
  Srce = 'srce',
  Herc = 'herc',
  Zvezda = 'zvezda',
  Skocko = 'skocko'
}

export interface TwoPeopleGame {
  [PlayerRole.Blue]: GamePlayedPlayerRole;
  [PlayerRole.Red]: GamePlayedPlayerRole;
  won: PlayerRole;
  played_at?: string;
}

export interface OnePersonGame extends GamePlayedPlayerRole {
  played_at?: string;
}

interface GamePlayedPlayerRole {
  player: User;
  points: number;
}

export const WS_GAME_ROOM = 'game_room';

export interface ClientGameRoomOptionsDto {
  create?: boolean;
  userName: string;
  userId: string;
  token: string;
}

interface RoomMetadata extends ClientGameRoomOptionsDto {
  clientId: string;
  requestId: string;
}

export interface AvailableRoom {
  clients: number;
  maxClients: number;
  metadata?: RoomMetadata;
  roomId: string;
}

export interface SlagalicaMessage {
  word: string;
}

export interface MojBrojMessage {
  formula: string;
}

export interface SkockoMessage {
  sequence: Skocko[];
}
