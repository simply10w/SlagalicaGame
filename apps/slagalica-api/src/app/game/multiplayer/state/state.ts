import { GameType, PlayerRole } from '@slagalica/data';
import { Schema, type } from 'colyseus.js';
import { AsocijacijaGameState } from './asocijacija';
import { MojBrojGameState } from './moj-broj';
import { Player } from './player';
import { SkockoGameState } from './skocko';
import { SlagalicaGameState } from './slagalica';
import { SpojniceGameState } from './spojnice';

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
  currentGame: GameType = GameType.NotStarted;

  @type('string')
  winner: PlayerRole;

  @type('number')
  time: number = 0;
}
