import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@slagalica-app/auth/reducers';
import { RoomActions } from '@slagalica-app/player/actions';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { GameType } from '@slagalica/data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sla-game',
  templateUrl: 'game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  blue$ = this.store.pipe(select(fromPlayer.getBluePlayer));
  red$ = this.store.pipe(select(fromPlayer.getRedPlayer));
  game$ = this.store.pipe(select(fromPlayer.getCurrentGame));
  time$ = this.store.pipe(select(fromPlayer.getTime));

  me$ = this.store.pipe(
    select(fromAuth.getUser),
    map(user => user.userName)
  );

  slagalicaGame$ = this.store.pipe(select(fromPlayer.getSlagalicaGame));

  GameType = GameType;

  constructor(private store: Store<any>) {}

  leaveRoom() {
    this.store.dispatch(RoomActions.leaveRoom());
  }
}
