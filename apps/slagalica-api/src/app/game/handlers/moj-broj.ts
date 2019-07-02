import { State, MojBrojGameState } from '../state';
import { GameHandler } from './shared';

export class MojBrojGameHandler implements GameHandler {
  constructor(public state: State) {}

  async initGame() {
    this.state.mojBrojGame = new MojBrojGameState();
    await this.state.mojBrojGame.initGame();
  }

  onMessage(player: string, data: { test: string }) {
    // handle asocijaija being played
    // by mutating the state appropriately
  }
}
