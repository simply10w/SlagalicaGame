import { State, SpojniceGameState } from '../state';
import { GameHandler } from './shared';

export class SpojniceGameHandler implements GameHandler {
  constructor(public state: State) {}

  async initGame() {
    this.state.spojniceGame = new SpojniceGameState();
    await this.state.spojniceGame.initGame();
  }

  onMessage(player: string, data: { test: string }) {
    // handle asocijaija being played
    // by mutating the state appropriately
  }
}
