import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { AsocijacijaGame } from '@slagalica/data';
import { showFormErrors } from '@slagalica/ui';
import { isArray, size, times } from 'lodash';

@Component({
  selector: 'sla-asocijacija-game-form',
  templateUrl: 'asocijacija-game-form.component.html',
  styleUrls: ['./asocijacija-game-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsocijacijaGameFormComponent {
  @Output() newGame = new EventEmitter<AsocijacijaGame>();

  word: string;

  constructor(private fb: FormBuilder) {}

  isEdit = false;
  form = this.createForm();

  GROUPS = times(4);
  HINTS = times(4);

  createForm() {
    return this.fb.group({
      solutions: this.fb.control(null, validateSolution),
      groups: this.fb.array(times(4).map(() => this.createGroup()))
    });
  }

  createGroup() {
    return this.fb.group({
      solutions: this.fb.control(null, validateSolution),
      hints: this.fb.array(
        times(4).map(() => this.fb.control(null, Validators.required))
      )
    });
  }

  add() {
    if (this.form.valid) {
      this.newGame.emit(this.form.value);
      // this.form.reset();
      // this.isEdit = false;
    } else {
      showFormErrors(this.form);
    }
  }
}

function validateSolution(control: AbstractControl) {
  const value: string[] = control.value;
  return isArray(value) && size(value) > 0 ? null : { solution: false };
}
