import { Schema } from 'colyseus.js';

export interface GameHandler<STATE = Schema> {
  state: STATE;
  onMessage(player: string, data: any): void;
  initGame(): Promise<void>;
}
