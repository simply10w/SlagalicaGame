import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Room, Client } from 'colyseus.js';
import { WS_GAME_ROOM, AvailableRoom } from '@slagalica/data';
import { Store, select } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { take } from 'rxjs/operators';

@Component({
  selector: 'sla-player-page',
  templateUrl: 'player-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerPageComponent implements OnInit, OnDestroy {
  private _client: Client;
  rooms;

  player$ = this.store.pipe(select(fromPlayer.getPlayer));

  private _room: Room;
  private set room(room: Room) {
    this._room = room;
    this._connectListeners(this._room);
  }

  constructor(private store: Store<any>, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this._client = new Client(getClientUrl());
    this.getAvailableRooms();
  }

  ngOnDestroy() {
    if (this._client) {
      this._client.close();
    }
  }

  createGame() {
    this.player$.pipe(take(1)).subscribe(player => {
      this.room = this._client.join(WS_GAME_ROOM, {
        create: true,
        ...player
      });
      console.log('createed room', this._room);
    });
  }

  joinGame(room: AvailableRoom) {
    this.player$.pipe(take(1)).subscribe(player => {
      this.room = this._client.join(room.roomId, player);
      console.log('joined room', room);
    });
  }

  private _connectListeners(room: Room) {
    room.onStateChange.add((...params) => {
      console.log('onState:', params);
    });

    room.onMessage.add((...params) => {
      console.log('onMessage:', params);
    });
    // room.onJoin.add(() => {
    //   // listen to patches coming from the server
    //   room.state.players.onAdd = (player, sessionId) => {
    //     console.log('CLIENT ADD PLAYER', player);
    //   };
    //   room.state.players.onRemove = (player, sessionId) => {
    //     console.log('CLIENT REMOVE PLAYER', player);
    //   };
    //   room.state.players.onChange = (player, sessionId) => {
    //     console.log('CLIENT STATE CHANGE', player);
    //   };
    // });
  }

  getAvailableRooms() {
    this._client.getAvailableRooms(WS_GAME_ROOM, (rooms, err) => {
      console.log({ rooms });
      this.rooms = rooms;
      this.cd.markForCheck();
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
