import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { SkockoGameActions } from '@slagalica-app/singleplayer/actions';
import { Skocko } from '@slagalica/data';
import { times } from 'lodash';
import { selectors } from './skocko.selectors';

@Component({
  selector: 'sla-skocko-game',
  templateUrl: 'skocko-game.component.html',
  styleUrls: ['./skocko-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkockoGameComponent {
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

  tries$ = this.store.pipe(select(selectors.getTriesList));
  points$ = this.store.pipe(select(selectors.getPoints));

  get controls() {
    return (this.form.get('sequence') as FormArray).controls;
  }

  constructor(private store: Store<any>) {}

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
