import { State, SkockoGameState } from '../state';
import { GameHandler } from './shared';

export class SkockoGameHandler implements GameHandler {
  constructor(public state: State) {}

  async initGame() {
    this.state.skockoGame = new SkockoGameState();
    await this.state.skockoGame.initGame();
  }

  onMessage(player: string, data: { test: string }) {
    // handle asocijaija being played
    // by mutating the state appropriately
  }
}
