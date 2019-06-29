import * as http from 'http';
import { Server, Room, Client } from 'colyseus';
import { monitor } from '@colyseus/monitor';

export class MyRoom extends Room {
  onInit(options: any) {}
  onJoin(client: Client, options: any) {
    setTimeout(() => {
      if (client.OPEN) {
        this.send(client, 'HELLO!');
      }
    }, 2000);
  }
  onMessage(client: Client, message: any) {}
  onLeave(client: Client, consented: boolean) {}
  onDispose() {}
}

export function createGameEngine(server: http.Server) {
  const gameServer = new Server({ server });
  gameServer.register('game_room', MyRoom);
  return monitor(gameServer);
}
