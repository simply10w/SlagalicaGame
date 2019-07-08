import { Injectable } from '@angular/core';
import { Client, Room } from 'colyseus.js';
import {
  SINGLEPLAYER_GAME_ROOM,
  ClientGameRoomOptionsDto
} from '@slagalica/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingleplayerService {
  private _client: Client;

  constructor() {
    this.initClient();
  }

  initClient() {
    this._client = new Client(this._getClientUrl());
  }

  createRoom(gameOptions: ClientGameRoomOptionsDto) {
    return new Observable<Room>(observer => {
      const room = this._client.join(SINGLEPLAYER_GAME_ROOM, {
        create: true,
        ...gameOptions
      });
      observer.next(room);
      observer.complete();
    });
  }

  private _getClientUrl() {
    return 'ws://localhost:3333';
  }
}
