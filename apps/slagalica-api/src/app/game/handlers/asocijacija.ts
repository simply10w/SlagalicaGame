import { GameType } from '@slagalica/data';
import { Room } from 'colyseus';
import { AsocijacijaGameState, State } from '../state';
import { GameHandler } from './shared';

export class AsocijacijaGameHandler extends GameHandler {
  constructor(room: Room<State>) {
    super(room);
  }

  async initGame() {
    this.room.state.currentGame = GameType.Asocijacije;
    this.room.state.asocijacijeGame = new AsocijacijaGameState();
    await this.room.state.asocijacijeGame.initGame();
  }

  onMessage(player: string, data: { test: string }) {
    // handle asocijaija being played
    // by mutating the state appropriately
  }
}
