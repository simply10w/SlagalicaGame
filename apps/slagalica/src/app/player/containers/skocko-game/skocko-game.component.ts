import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { SkockoGameActions } from '@slagalica-app/player/actions';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { PlayerRole, Skocko } from '@slagalica/data';
import { times } from 'lodash';
import { Subscription } from 'rxjs';
import { withLatestFrom, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'sla-skocko-game',
  templateUrl: 'skocko-game.component.html',
  styleUrls: ['./skocko-game.component.scss']
})
export class SkockoGameComponent implements OnInit, OnDestroy {
  private _listenGame: Subscription;

  amIRed$ = this.store.pipe(select(fromPlayer.getAmIRed));
  amIBlue$ = this.store.pipe(select(fromPlayer.getAmIBlue));
  game$ = this.store.pipe(select(fromPlayer.getSkockoGame));

  form = new FormGroup({
    sequence: new FormArray(
      times(4, () => new FormControl(null, Validators.required))
    )
  });

  OPTIONS = [
    Skocko.Herc,
    Skocko.Pik,
    Skocko.Skocko,
    Skocko.Srce,
    Skocko.Tref,
    Skocko.Zvezda
  ];

  currentIndex: number = 0;
  disabledBoard: boolean;
  tries: any[];

  get controls() {
    return (this.form.get('sequence') as FormArray).controls;
  }

  constructor(private store: Store<any>, private _cd: ChangeDetectorRef) {}

  ngOnInit() {
    this._listenGame = this.game$
      .pipe(withLatestFrom(this.amIRed$, this.amIBlue$))
      .subscribe(([game, amIRed, amIBlue]) => {
        const player = game[game.turn as 'red' | 'blue'];

        if (!player) {
          this.disabledBoard = true;
        } else {
          this.currentIndex = player.tries.length;
          this.tries = [...player.tries];

          if (game.turn === PlayerRole.Red && amIBlue)
            this.disabledBoard = true;
          else if (game.turn === PlayerRole.Blue && amIRed)
            this.disabledBoard = true;
          else return (this.disabledBoard = false);
        }

        this._cd.markForCheck();
      });
  }

  ngOnDestroy() {
    if (this._listenGame) {
      this._listenGame.unsubscribe();
    }
  }

  guess() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.store.dispatch(
        SkockoGameActions.guess({
          sequence: this.form.get('sequence').value
        })
      );
    }
  }
}
