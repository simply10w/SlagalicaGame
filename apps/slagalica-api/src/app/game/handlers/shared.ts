import { Room } from 'colyseus';

export interface GameHandler<STATE = any> {
  room: Room<STATE>;
  onMessage(player: string, data: any): void;
  initGame(): Promise<void>;
}
