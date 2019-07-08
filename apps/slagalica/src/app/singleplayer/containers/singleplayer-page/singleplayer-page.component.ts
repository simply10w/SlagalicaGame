import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PlayerPageActions } from '@slagalica-app/singleplayer/actions';
import * as fromPlayer from '@slagalica-app/singleplayer/reducers';

@Component({
  selector: 'sla-singleplayer-page',
  templateUrl: 'singleplayer-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleplayerPageComponent implements OnInit {
  player$ = this.store.pipe(select(fromPlayer.getPlayer));
  inRoom$ = this.store.pipe(select(fromPlayer.getIsInRoom));
  single$ = this.store.pipe(select(fromPlayer.getSingleResultsList));
  multi$ = this.store.pipe(select(fromPlayer.getMultiResultsList));

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(PlayerPageActions.loadSingleResults());
    this.store.dispatch(PlayerPageActions.loadMultiResults());
  }

  createGame() {
    this.store.dispatch(PlayerPageActions.createGame());
  }
}
