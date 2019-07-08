import {
  GameType,
  SpojnicaGuessMessage,
  SpojnicaSkipMessage,
  SpojnicaGame
} from '@slagalica/data';
import { Room } from 'colyseus';
import { SpojniceGameState, State } from '../state';
import { GameHandler } from './shared';

const GAME_DURATION_SECONDS = 60;

export class SpojniceGameHandler extends GameHandler {
  constructor(room: Room<State>, public game: SpojnicaGame) {
    super(room);
  }

  async initGame() {
    this.room.state.currentGame = GameType.Spojnice;
    this.room.state.spojniceGame = new SpojniceGameState();
    await this.room.state.spojniceGame.initGame(this.game);
    this._restartTimer();
  }

  onMessage(message: SpojnicaGuessMessage | SpojnicaSkipMessage) {
    if (message.type === 'guess_spojnica') {
      this.room.state.spojniceGame.guess(message.guess);

      if (this.room.state.spojniceGame.finished) {
        this.declareEndGame();
      }
    }
  }

  private _restartTimer() {
    this.clearTimer();
    this._startTimer(GAME_DURATION_SECONDS, () => this._endTimer());
  }

  private _endTimer() {
    this.room.state.spojniceGame.finished = true;
    this.declareEndGame();
  }
}
