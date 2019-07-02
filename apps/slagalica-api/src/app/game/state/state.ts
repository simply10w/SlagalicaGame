import { AsocijacijaGameState } from './asocijacija';
import { SlagalicaGameState } from './slagalica';
import { MojBrojGameState } from './moj-broj';
import { SkockoGameState } from './skocko';
import { SpojniceGameState } from './spojnice';
import { Schema, type } from 'colyseus.js';
import { Player } from './player';

export enum GameType {
  NotStarted = 'not_started',
  Asocijacije = 'asocijacije',
  Skocko = 'skocko',
  Spojnice = 'spojnice',
  Slagalica = 'slagalica',
  MojBroj = 'moj_broj'
}

export enum PlayerTurn {
  Idle = 'idle',
  Red = 'red',
  Blue = 'blue'
}

export class State extends Schema {
  @type(AsocijacijaGameState)
  asocijacijeGame: AsocijacijaGameState;

  @type(MojBrojGameState)
  mojBrojGame: MojBrojGameState;

  @type(SpojniceGameState)
  spojniceGame: SpojniceGameState;

  @type(SkockoGameState)
  skockoGame: SkockoGameState;

  @type(SlagalicaGameState)
  slagalicaGame: SlagalicaGameState;

  @type(Player)
  red: Player;

  @type(Player)
  blue: Player;

  @type('string')
  currentTurn: PlayerTurn;

  @type('string')
  currentGame: GameType;
}
