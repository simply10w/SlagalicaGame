import { State, AsocijacijaGameState } from '../state';
import { GameHandler } from './shared';

export class AsocijacijaGameHandler implements GameHandler {
  constructor(public state: State) {}

  async initGame() {
    this.state.asocijacijeGame = new AsocijacijaGameState();
    await this.state.asocijacijeGame.initGame();
  }

  onMessage(player: string, data: { test: string }) {
    // handle asocijaija being played
    // by mutating the state appropriately
  }
}
