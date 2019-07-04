import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { map, withLatestFrom } from 'rxjs/operators';
import { PlayerRole, Skocko } from '@slagalica/data';
// import { MojBrojGameActions } from '@slagalica-app/player/actions';

@Component({
  selector: 'sla-skocko-game',
  templateUrl: 'skocko-game.component.html',
  styleUrls: ['./skocko-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkockoGameComponent {
  amIRed$ = this.store.pipe(select(fromPlayer.getAmIRed));
  amIBlue$ = this.store.pipe(select(fromPlayer.getAmIBlue));

  game$ = this.store.pipe(select(fromPlayer.getSkockoGame));

  player$ = this.store.pipe(
    select(fromPlayer.getCurrentSkockoPlayer),
    map(player => {
      if (!player) return player;
      const tries = [...player.tries];
      const MAX_TRIES = 6;
      let triesToInsert = MAX_TRIES - player.tries.length;

      while (triesToInsert-- > 0) {
        tries.push({
          try: [],
          result: [] as boolean[]
        });
      }

      return {
        tries,
        points: player.points
      };
    })
  );

  TRIES = [0, 0, 0, 0, 0, 0];
  SELECTIONS = [0, 0, 0, 0];
  RESULTS = [0, 0, 0, 0];

  options = [
    Skocko.Herc,
    Skocko.Pik,
    Skocko.Skocko,
    Skocko.Srce,
    Skocko.Tref,
    Skocko.Zvezda
  ];

  disabledBoard$ = this.game$.pipe(
    map(game => game.turn),
    withLatestFrom(this.amIRed$, this.amIBlue$),
    map(([currentPlayer, amIRed, amIBlue]) => {
      if (currentPlayer === PlayerRole.Red && amIBlue) return true;
      else if (currentPlayer === PlayerRole.Blue && amIRed) return true;
      else return false;
    })
  );

  constructor(private store: Store<any>) {}

  submit() {
    // this.submitted = true;
    // this.store.dispatch(
    //   MojBrojGameActions.submitPlayerTry({
    //     formula: this.formula
    //   })
    // );
  }

  change(formula: string) {
    // this.formula = formula;
  }
}
