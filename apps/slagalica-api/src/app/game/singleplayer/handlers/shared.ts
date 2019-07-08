import { GameWinner, PlayerRole } from '@slagalica/data';
import { Room } from 'colyseus';
import { State } from '../state';

const TICK_INTERVAL = 1000; // 1 second expressed in milliseconds

export abstract class GameHandler {
  private _timer: NodeJS.Timer;

  constructor(public room: Room<State>) {}

  abstract onMessage(data: any): void;
  abstract initGame(): Promise<void>;

  declareEndGame() {
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
        this.clearTimer();
      }
    }, TICK_INTERVAL);
  }

  clearTimer() {
    this.room.state.time = 0;
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  private _tick() {
    this.room.state.time += 1;
  }
}
