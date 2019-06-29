import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Room, Client } from 'colyseus.js';
import { WS_GAME_ROOM } from '@slagalica/data';

@Component({
  selector: 'sla-player-page',
  templateUrl: 'player-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerPageComponent implements OnInit, OnDestroy {
  private _client: Client;

  private _room: Room;
  private set room(room: Room) {
    this._room = room;
    this._connectListeners(this._room);
  }

  constructor() {}

  ngOnInit() {
    this._client = new Client(getClientUrl());
    this._client.onOpen.add(function() {
      console.log('onOpen');
    });
    this._getAvailableRooms();
  }

  ngOnDestroy() {
    if (this._client) {
      this._client.close();
    }
  }

  createGame() {
    this.room = this._client.join(WS_GAME_ROOM, { create: true });
    console.log('createed room', this._room);
  }

  joinGame(roomId: string) {
    this.room = this._joinById(roomId);
  }

  private _connectListeners(room: Room) {
    room.onJoin.add(() => {
      console.log(room.id, 'joined!');
      room.send('Hola!');
    });

    room.onLeave.add(() => {
      console.log('LEFT ROOM', arguments);
    });
    room.onStateChange.add(data => {
      console.log('chat update: ', data);
    });

    room.onMessage.add((msg: any) => {
      console.log('Message', msg);
    });
  }

  private _joinById(roomId: string) {
    return this._client.join(roomId);
  }

  private _getAvailableRooms() {
    this._client.getAvailableRooms(WS_GAME_ROOM, (rooms, err) => {
      console.log(rooms);
    });
  }
}

function getClientUrl() {
  // ws://localhost:4200/?colyseusid=
  // const host = window.document.location.host.replace(/:.*/, '');
  // return (
  //   location.protocol.replace('http', 'ws') +
  //   host +
  //   (location.port ? ':' + location.port : '')
  // );
  return 'ws://localhost:3333';
}
