import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { GameType } from '@slagalica/data';

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

  slagalicaGame$ = this.store.pipe(select(fromPlayer.getSlagalicaGame));

  GameType = GameType;

  constructor(private store: Store<any>) {}
}
