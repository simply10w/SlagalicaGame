import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { SpojnicaGame } from '@slagalica/data';
import { showFormErrors } from '@slagalica/ui';
import { times } from 'lodash';

@Component({
  selector: 'sla-spojnica-game-form',
  templateUrl: 'spojnica-game-form.component.html',
  styleUrls: ['./spojnica-game-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpojnicaGameFormComponent {
  @Output() newSpojnica = new EventEmitter<SpojnicaGame>();

  word: string;

  constructor(private fb: FormBuilder) {}

  isEdit = false;
  form = this.createForm();

  get pairs() {
    return (this.form.get('pairs') as FormArray).controls;
  }

  createForm() {
    return this.fb.group({
      description: this.fb.control(null, Validators.required),
      pairs: this.fb.array(
        times(10).map(() =>
          this.fb.group({
            left: this.fb.control(null, Validators.required),
            right: this.fb.control(null, Validators.required)
          })
        )
      )
    });
  }

  add() {
    if (this.form.valid) {
      this.newSpojnica.emit(this.form.value);
      this.form.reset();
      this.isEdit = false;
    } else {
      showFormErrors(this.form);
    }
  }
}
