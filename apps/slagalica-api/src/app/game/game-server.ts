import * as http from 'http';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';
import { Logger } from '@slagalica-api/util';
import { MULTIPLAYER_GAME_ROOM, SINGLEPLAYER_GAME_ROOM } from '@slagalica/data';
import { MultiplayerGameRoom } from './multiplayer';
import { SingleplayerGameRoom } from './singleplayer';

export function createGameServer(server: http.Server) {
  const gameServer = new Server({ server });
  gameServer.register(MULTIPLAYER_GAME_ROOM, MultiplayerGameRoom);
  gameServer.register(SINGLEPLAYER_GAME_ROOM, SingleplayerGameRoom);

  gameServer.onShutdown(() => {
    Logger.info(`game server is going down.`);
  });

  return monitor(gameServer);
}
