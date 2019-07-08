import { Room, Client } from 'colyseus';
import { ClientGameRoomOptionsDto } from '@slagalica/data';
import { verifyToken } from '@slagalica-api/shared/token';
import { isPlayer } from '@slagalica-api/shared/permissions';
import { State, Player } from './state';
import { GameFlow } from './game-flow';

export class SingleplayerGameRoom extends Room<State> {
  maxClients = 1;
  gameFlow: GameFlow;

  onAuth(options: ClientGameRoomOptionsDto) {
    try {
      const user = verifyToken(options.token);
      return isPlayer(user);
    } catch (err) {
      console.log('Unauthenticated.');
      return false;
    }
  }

  onInit(options: ClientGameRoomOptionsDto) {
    this.setMetadata(options);
    this.setState(new State());
    this.gameFlow = new GameFlow(this);
  }

  onJoin(client: Client, options: ClientGameRoomOptionsDto) {
    const playerId = client.sessionId;
    this.state.player = new Player(playerId, {
      userId: options.userId,
      userName: options.userName
    });

    this.gameFlow.start();
  }

  requestJoin(options: ClientGameRoomOptionsDto, isNewRoom: boolean) {
    return options.create
      ? options.create && isNewRoom
      : this.clients.length > 0;
  }

  onMessage(client: Client, message: any) {
    this.gameFlow.onMessage(client.sessionId, message);
  }

  onLeave(client: Client) {}

  onDispose() {
    console.log('Dispose StateHandlerRoom');
  }
}
