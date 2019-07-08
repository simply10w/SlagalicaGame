import { GameType, MojBrojMessage } from '@slagalica/data';
import { Room } from 'colyseus';
import { MojBrojGameState, State } from '../state';
import { GameHandler } from './shared';

const GAME_DURATION_SECONDS = 60;

export class MojBrojGameHandler extends GameHandler {
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

  onMessage(message: MojBrojMessage) {
    this.gameState.formula = message.formula;
    this._endGame();
  }

  private _endGame() {
    this.clearTimer();
    this.gameState.calculateWinner().then(() => {
      this.declareEndGame();
    });
  }
}
