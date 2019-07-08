import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PlayerPageActions } from '@slagalica-app/singleplayer/actions';
import * as fromPlayer from '@slagalica-app/singleplayer/reducers';

@Component({
  selector: 'sla-singleplayer-page',
  templateUrl: 'singleplayer-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleplayerPageComponent {
  player$ = this.store.pipe(select(fromPlayer.getPlayer));
  inRoom$ = this.store.pipe(select(fromPlayer.getIsInRoom));

  constructor(private store: Store<any>) {}

  createGame() {
    this.store.dispatch(PlayerPageActions.createGame());
  }
}
