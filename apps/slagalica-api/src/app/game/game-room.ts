import { Room, Client } from 'colyseus';

interface JoinOptions {
  create?: boolean;
}

export class GameRoom extends Room<any> {
  maxClients = 2;

  onInit(options) {
    console.log('CREATING NEW ROOM', options);
  }

  onJoin(client: Client, options, auth) {
    console.log('JOINING ROOM', client.id, auth);
  }

  requestJoin(options: JoinOptions, isNewRoom: boolean) {
    return options.create
      ? options.create && isNewRoom
      : this.clients.length > 0;
  }

  onMessage(client, message: any) {
    console.log(message);
  }

  onLeave(client) {
    console.log('ChatRoom:', client.sessionId, 'left!');
  }
}
