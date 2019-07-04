import { GameWinner } from '@slagalica/data';
import { Room } from 'colyseus';
import { State } from '../state';

export abstract class GameHandler {
  protected _red: string;
  protected _blue: string;

  constructor(public room: Room<State>) {
    this._red = this.room.state.red.playerId;
    this._blue = this.room.state.blue.playerId;
  }

  abstract onMessage(player: string, data: any): void;
  abstract initGame(): Promise<void>;

  declareEndGame(winner?: GameWinner) {
    console.log('WINNER IS', winner);
    this.room.emit('end_game');
  }
}
