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

export enum SkockoGameStates {
  NotStarted = 'not_started',
  BluePlaying = 'blue_playing',
  RedPlaying = 'red_playing',
  BlueStrikeOutRedPlaying = 'blue_stroke_out',
  RedStrikeOutBluePlaying = 'red_stroke_out',
  Finished = 'finished'
}

export enum SkockoPositionResult {
  InPosition = 'in_position',
  WrongPosition = 'wrong_position',
  NotInSequence = 'not_in_sequence'
}

export interface MultiplayerGame {
  red: string;
  redPoints: number;
  blue: string;
  bluePoints: number;
  won: PlayerRole;
  played_at?: string;
}

export interface SingleplayerGame extends GamePlayedPlayerRole {
  game: string;
  played_at?: string;
}

export interface SingleplayerResultDto {
  game: string;
  points: number;
  player: User;
  played_at: string;
}

interface GamePlayedPlayerRole {
  player: string;
  points: number;
}

export const MULTIPLAYER_GAME_ROOM = 'multiplayer_game_room';
export const SINGLEPLAYER_GAME_ROOM = 'singleplayer_game_room';

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

export interface AsocijacijaOpenMessage {
  type: 'open';
  /** from 0 to 20 */
  open: number;
}

export interface AsocijacijaSolveGroupMessage {
  type: 'solve_group';
  group: 0 | 1 | 2 | 3 | 4;
  solution: string;
}

export interface AsocijacijaSolveGameMessage {
  type: 'solve_game';
  solution: string;
}

export interface SpojnicaGuessMessage {
  type: 'guess_spojnica';
  guess: string;
}

export interface SpojnicaSkipMessage {
  type: 'skip_spojnica';
}

export enum AsocijacijaStates {
  BluePlaying = 'blue_playing',
  BlueSolving = 'blue_solving',
  RedPlaying = 'red_playing',
  RedSolving = 'red_solving',
  Finished = 'finished'
}

export enum SpojniceStates {
  BluePlaying = 'blue_playing',
  BlueStrikeOutRedPlaying = 'blue_strike_out_red_playing',
  RedPlaying = 'red_playing',
  RedStrikeOutBluePlaying = 'red_strike_out_blue_playing',
  Finished = 'finished'
}

export interface GameOfTheDay {
  spojnica: string;
  asocijacija: string;
  date: string;
}
