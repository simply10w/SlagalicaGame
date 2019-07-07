import {
  GameType,
  SpojnicaGuessMessage,
  SpojnicaSkipMessage,
  PlayerRole,
  SpojniceStates
} from '@slagalica/data';
import { Room } from 'colyseus';
import { SpojniceGameState, State } from '../state';
import { GameHandler } from './shared';

const GAME_DURATION_SECONDS = 60;

export class SpojniceGameHandler extends GameHandler {
  constructor(room: Room<State>) {
    super(room);
  }

  async initGame() {
    this.room.state.currentGame = GameType.Spojnice;
    this.room.state.spojniceGame = new SpojniceGameState();
    await this.room.state.spojniceGame.initGame();
    this.room.state.spojniceGame.onRestart(() => this._restartTimer());
    this._restartTimer();
  }

  onMessage(
    player: string,
    message: SpojnicaGuessMessage | SpojnicaSkipMessage
  ) {
    const role: PlayerRole = this._getPlayerRole(player);
    if (!role) return;

    if (message.type === 'guess_spojnica') {
      this.room.state.spojniceGame.guess(role, message.guess);

      if (this.room.state.spojniceGame.state === SpojniceStates.Finished) {
        this._handleEndGame();
      }
    }
  }

  private _handleEndGame() {
    this.declareEndGame(null);
  }

  private _restartTimer() {
    this.clearTimer();
    this._startTimer(GAME_DURATION_SECONDS, () => this._endTimer());
  }

  private _endTimer() {
    this.room.state.spojniceGame.endTime();
    if (this.room.state.spojniceGame.state === SpojniceStates.Finished) {
      this._handleEndGame();
    }
  }
}
