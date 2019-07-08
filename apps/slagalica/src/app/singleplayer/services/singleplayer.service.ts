import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ClientGameRoomOptionsDto,
  SingleplayerResultDto,
  SINGLEPLAYER_GAME_ROOM
} from '@slagalica/data';
import { Client, Room } from 'colyseus.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingleplayerService {
  private _client: Client;

  constructor(private http: HttpClient) {
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

  loadSingleResults() {
    return this.http.get<{ results: SingleplayerResultDto[] }>(
      '/api/results/single'
    );
  }

  loadMultiResults() {
    return this.http.get<{ results: any[] }>('/api/results/multi');
  }

  private _getClientUrl() {
    return 'ws://localhost:3333';
  }
}
