import { Injectable } from '@angular/core';
import { Client, Room } from 'colyseus.js';
import {
  WS_GAME_ROOM,
  ClientGameRoomOptionsDto,
  AvailableRoom
} from '@slagalica/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiplayerService {
  private _client: Client;

  constructor() {
    this.initClient();
  }

  initClient() {
    this._client = new Client(this._getClientUrl());
  }

  createRoom(gameOptions: ClientGameRoomOptionsDto) {
    return new Observable<Room>(observer => {
      const room = this._client.join(WS_GAME_ROOM, {
        create: true,
        ...gameOptions
      });
      observer.next(room);
      observer.complete();
    });
  }

  joinRoom(roomId: string, gameOptions: ClientGameRoomOptionsDto) {
    return new Observable<Room>(observer => {
      const room = this._client.join(roomId, gameOptions);
      observer.next(room);
      observer.complete();
    });
  }

  getAvailableRooms(): Observable<AvailableRoom[]> {
    return new Observable(observer => {
      this._client.getAvailableRooms(WS_GAME_ROOM, (rooms, err) => {
        if (err) observer.error(err);
        else {
          observer.next(rooms);
          observer.complete();
        }
      });
    });
  }

  private _getClientUrl() {
    return 'ws://localhost:3333';
  }
}
