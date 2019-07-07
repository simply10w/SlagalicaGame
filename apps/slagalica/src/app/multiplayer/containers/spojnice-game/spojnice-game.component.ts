import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/multiplayer/reducers';
import { SpojniceGameActions } from '@slagalica-app/multiplayer/actions';
import { SpojniceStates, PlayerRole } from '@slagalica/data';
import { selectors } from './spojnice.selectors';

@Component({
  selector: 'sla-spojnice-game',
  templateUrl: 'spojnice-game.component.html',
  styleUrls: ['./spojnice-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpojniceGameComponent {
  amIRed$ = this.store.pipe(select(fromPlayer.getAmIRed));
  amIBlue$ = this.store.pipe(select(fromPlayer.getAmIBlue));
  SpojniceStates = SpojniceStates;
  PlayerRole = PlayerRole;

  constructor(private store: Store<any>) {}

  currentStateDescription$ = this.store.pipe(
    select(selectors.getCurrentStateDescription)
  );
  turnColor$ = this.store.pipe(select(selectors.getTurnColor));

  isInputEnabled$ = this.store.pipe(select(selectors.isInputEnabled));

  leftSideTiles$ = this.store.pipe(select(selectors.getLeftSideTiles));
  rightSideTiles$ = this.store.pipe(select(selectors.getRightSideTiles));

  redPlayerPoints$ = this.store.pipe(select(selectors.getRedPlayerPoints));
  bluePlayerPoints$ = this.store.pipe(select(selectors.getBluePlayerPoints));

  currentIndex$ = this.store.pipe(select(selectors.getCurrentIndex));

  trackByOrder = (index: number) => index;

  guess(tileText: string) {
    this.store.dispatch(
      SpojniceGameActions.guess({
        guess: tileText
      })
    );
  }
}
