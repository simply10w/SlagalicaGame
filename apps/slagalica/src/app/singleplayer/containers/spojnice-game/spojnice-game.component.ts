import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SpojniceGameActions } from '@slagalica-app/singleplayer/actions';
import { selectors } from './spojnice.selectors';

@Component({
  selector: 'sla-spojnice-game',
  templateUrl: 'spojnice-game.component.html',
  styleUrls: ['./spojnice-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpojniceGameComponent {
  constructor(private store: Store<any>) {}

  leftSideTiles$ = this.store.pipe(select(selectors.getLeftSideTiles));
  rightSideTiles$ = this.store.pipe(select(selectors.getRightSideTiles));
  points$ = this.store.pipe(select(selectors.getPlayerPoints));
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
