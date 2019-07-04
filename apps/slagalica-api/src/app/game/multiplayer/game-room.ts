import { Room, Client } from 'colyseus';
import { ClientGameRoomOptionsDto } from '@slagalica/data';
import { verifyToken } from '@slagalica-api/shared/token';
import { isPlayer } from '@slagalica-api/shared/permissions';
import { State, Player } from './state';
import { GameFlow } from './game-flow';

export class MultiplayerGameRoom extends Room<State> {
  maxClients = 2;
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
    if (this.clients.length === 1) {
      this.state.red = new Player(playerId, {
        userId: options.userId,
        userName: options.userName
      });
    } else {
      this.state.blue = new Player(playerId, {
        userId: options.userId,
        userName: options.userName
      });

      this.gameFlow.start();
    }
  }

  requestJoin(options: ClientGameRoomOptionsDto, isNewRoom: boolean) {
    return options.create
      ? options.create && isNewRoom
      : this.clients.length > 0;
  }

  onMessage(client: Client, message: any) {
    this.gameFlow.onMessage(client.sessionId, message);
  }

  onLeave(client: Client) {
    if (this.state.red && this.state.red.playerId === client.sessionId) {
      this.state.red = null;
    } else if (
      this.state.blue &&
      this.state.blue.playerId === client.sessionId
    ) {
      this.state.blue = null;
    }
  }

  onDispose() {
    console.log('Dispose StateHandlerRoom');
  }
}
