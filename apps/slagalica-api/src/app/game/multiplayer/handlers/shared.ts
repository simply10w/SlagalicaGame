import { GameWinner } from '@slagalica/data';
import { Room } from 'colyseus';
import { State } from '../state';

const TICK_INTERVAL = 1000; // 1 second expressed in milliseconds

export abstract class GameHandler {
  protected _red: string;
  protected _blue: string;
  private _timer: NodeJS.Timer;

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

  /**
   *
   * @param duration - duration in seconds
   * @param callback - callback to invoke when it gets counted out
   */
  protected _startTimer(duration: number, callback: () => void) {
    this._timer = setInterval(() => {
      this._tick();
      if (this.room.state.time === duration) {
        callback();
      }
    }, TICK_INTERVAL);
  }

  clearTimer() {
    if (this._timer) clearInterval(this._timer);
  }

  private _tick() {
    this.room.state.time += 1;
  }
}
