import * as http from 'http';
import { Server, Room, Client } from 'colyseus';
import { monitor } from '@colyseus/monitor';
import { Logger } from '@slagalica-api/util';
import { WS_GAME_ROOM } from '@slagalica/data';
import { GameRoom } from './game-room';

export function createGameServer(server: http.Server) {
  const gameServer = new Server({ server });
  gameServer.register(WS_GAME_ROOM, GameRoom);
  gameServer.onShutdown(() => {
    Logger.info(`game server is going down.`);
  });

  return monitor(gameServer);
}
