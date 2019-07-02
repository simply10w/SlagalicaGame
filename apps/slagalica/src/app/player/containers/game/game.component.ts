import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/player/reducers';

@Component({
  selector: 'sla-game',
  templateUrl: 'game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  blue$ = this.store.pipe(select(fromPlayer.getBluePlayer));
  red$ = this.store.pipe(select(fromPlayer.getRedPlayer));
  game$ = this.store.pipe(select(fromPlayer.getCurrentGame));
  turn$ = this.store.pipe(select(fromPlayer.getCurrentTurn));

  slagalicaGame$ = this.store.pipe(select(fromPlayer.getSlagalicaGame));

  constructor(private store: Store<any>) {}
}
