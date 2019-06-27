import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sla-word-game-form',
  templateUrl: 'word-game-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordGameFormComponent {
  @Output() newWord = new EventEmitter<string>();

  control = new FormControl(null, Validators.required);

  add() {
    if (this.control.valid) {
      this.newWord.emit(this.control.value);
      this.control.reset(null);
    } else {
      this.control.markAsDirty();
      this.control.markAsTouched();
    }
  }
}
