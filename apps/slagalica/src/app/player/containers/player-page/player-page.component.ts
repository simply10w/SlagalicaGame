import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PlayerPageActions } from '@slagalica-app/player/actions';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { AvailableRoom } from '@slagalica/data';

@Component({
  selector: 'sla-player-page',
  templateUrl: 'player-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerPageComponent {
  rooms$ = this.store.pipe(select(fromPlayer.getAllRooms));
  player$ = this.store.pipe(select(fromPlayer.getPlayer));
  inRoom$ = this.store.pipe(select(fromPlayer.getIsInRoom));

  constructor(private store: Store<any>) {}

  createGame() {
    this.store.dispatch(PlayerPageActions.createRoom());
  }

  joinGame(room: AvailableRoom) {
    this.store.dispatch(
      PlayerPageActions.joinRoom({
        roomId: room.roomId
      })
    );
  }
}
