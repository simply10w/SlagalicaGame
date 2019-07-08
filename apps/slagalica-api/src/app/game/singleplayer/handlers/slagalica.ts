import { SlagalicaMessage, GameType } from '@slagalica/data';
import { Room } from 'colyseus';
import { SlagalicaGameState, State } from '../state';
import { GameHandler } from './shared';

const GAME_DURATION_SECONDS = 60; // 60 seconds

export class SlagalicaGameHandler extends GameHandler {
  constructor(room: Room<State>) {
    super(room);
  }

  async initGame() {
    this.room.state.currentGame = GameType.Slagalica;
    this.room.state.slagalicaGame = new SlagalicaGameState();
    await this.room.state.slagalicaGame.initGame();
    this._startTimer(GAME_DURATION_SECONDS, () => this._endGame());
  }

  get gameState() {
    return this.room.state.slagalicaGame;
  }

  onMessage(message: SlagalicaMessage) {
    this.gameState.word = message.word;
    this._endGame();
  }

  private _endGame() {
    this.clearTimer();
    this.gameState.calculateWinner().then(() => {
      this.declareEndGame();
    });
  }
}
