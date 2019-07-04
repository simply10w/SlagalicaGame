import { SlagalicaMessage, GameType } from '@slagalica/data';
import { Room } from 'colyseus';
import { SlagalicaGameState, State } from '../state';
import { GameHandler } from './shared';

const GAME_DURATION_SECONDS = 60; // 60 seconds

export class SlagalicaGameHandler extends GameHandler {
  private _redWord: string;
  private _blueWord: string;

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

  onMessage(player: string, message: SlagalicaMessage) {
    if (this._red === player && !this._redWord) {
      this._redWord = message.word;
    } else if (this._blue === player && !this._blueWord) {
      this._blueWord = message.word;
    }

    if (this._blueWord && this._redWord) {
      this._endGame();
    }
  }

  private _endGame() {
    this.gameState.red.word = this._redWord;
    this.gameState.blue.word = this._blueWord;
    this.clearTimer();
    this.gameState.calculateWinner().then(() => {
      this.declareEndGame(this.gameState.winner);
    });
  }
}
