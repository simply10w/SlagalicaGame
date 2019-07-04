import { GameType, MojBrojMessage } from '@slagalica/data';
import { Room } from 'colyseus';
import { MojBrojGameState, State } from '../state';
import { GameHandler } from './shared';

const GAME_DURATION_SECONDS = 60;

export class MojBrojGameHandler extends GameHandler {
  private _redFormula: string;
  private _blueFormula: string;

  constructor(room: Room<State>) {
    super(room);
  }

  get state() {
    return this.room.state;
  }

  get gameState() {
    return this.state.mojBrojGame;
  }

  async initGame() {
    this.state.currentGame = GameType.MojBroj;
    this.state.mojBrojGame = new MojBrojGameState();
    await this.gameState.initGame();
    this._startTimer(GAME_DURATION_SECONDS, () => this._endGame());
  }

  onMessage(player: string, message: MojBrojMessage) {
    if (this._red === player && !this._redFormula) {
      this._redFormula = message.formula;
    } else if (this._blue === player && !this._blueFormula) {
      this._blueFormula = message.formula;
    }

    if (this._redFormula && this._blueFormula) {
      this._endGame();
    }
  }

  private _endGame() {
    this.gameState.red.formula = this._redFormula;
    this.gameState.blue.formula = this._blueFormula;
    this.clearTimer();
    this.gameState.calculateWinner().then(() => {
      this.declareEndGame(this.gameState.winner);
    });
  }
}
