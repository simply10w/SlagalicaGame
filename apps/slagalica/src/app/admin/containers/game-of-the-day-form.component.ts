import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AdminPageActions } from '@slagalica-app/admin/actions';
import * as fromAdmin from '@slagalica-app/admin/reducers';
import moment from 'moment';

@Component({
  selector: 'sla-game-of-the-day-form',
  templateUrl: './game-of-the-day-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOfTheDayFormComponent implements OnInit {
  form = new FormGroup({
    date: new FormControl(null, Validators.required),
    spojnica: new FormControl(null, Validators.required),
    asocijacija: new FormControl(null, Validators.required)
  });

  asocijacijas$ = this.store.pipe(select(fromAdmin.getAllAsocijacijas));
  spojnicas$ = this.store.pipe(select(fromAdmin.getAllSpojnicas));

  trackById = (index: number, ent: { _id: string }) => ent._id;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(AdminPageActions.getAsocijacijaGames());
    this.store.dispatch(AdminPageActions.getSpojnicaGames());
  }

  create() {
    if (this.form.valid) {
      const date = moment(this.form.value.date).format();
      this.store.dispatch(
        AdminPageActions.createGameOfTheDay({
          game: { ...this.form.value, date }
        })
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
