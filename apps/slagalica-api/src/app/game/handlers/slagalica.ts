import { State, SlagalicaGameState } from '../state';
import { GameHandler } from './shared';

export class SlagalicaGameHandler implements GameHandler {
  constructor(public state: State) {}

  async initGame() {
    this.state.slagalicaGame = new SlagalicaGameState();
    await this.state.slagalicaGame.initGame();
  }

  onMessage(player: string, data: { test: string }) {
    // handle asocijaija being played
    // by mutating the state appropriately
  }
}
