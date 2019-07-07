import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PlayerPageActions } from '@slagalica-app/multiplayer/actions';
import * as fromMultilayer from '@slagalica-app/multiplayer/reducers';
import { AvailableRoom } from '@slagalica/data';

@Component({
  selector: 'sla-multiplayer-page',
  templateUrl: 'multiplayer-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiplayerPageComponent {
  rooms$ = this.store.pipe(select(fromMultilayer.getAllRooms));
  player$ = this.store.pipe(select(fromMultilayer.getPlayer));
  inRoom$ = this.store.pipe(select(fromMultilayer.getIsInRoom));

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
