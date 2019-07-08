import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameActions } from '@slagalica-app/singleplayer/actions';
import * as fromPlayer from '@slagalica-app/singleplayer/reducers';
import { GameType } from '@slagalica/data';

@Component({
  selector: 'sla-game',
  templateUrl: 'game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  player$ = this.store.pipe(select(fromPlayer.getPlayer));
  game$ = this.store.pipe(select(fromPlayer.getCurrentGame));
  time$ = this.store.pipe(select(fromPlayer.getTime));

  slagalicaGame$ = this.store.pipe(select(fromPlayer.getSlagalicaGame));

  GameType = GameType;

  constructor(private store: Store<any>) {}

  leaveGame() {
    this.store.dispatch(GameActions.leaveGame());
  }
}
