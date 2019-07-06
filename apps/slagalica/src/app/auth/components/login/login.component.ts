import {
  Component,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { showFormErrors } from '@slagalica/ui';
import { LoginDto } from '@slagalica/data';

@Component({
  selector: 'sla-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @Output() login = new EventEmitter<LoginDto>();

  @Input() errorMessage: string;

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  form = this.fb.group({
    userName: this.fb.control(null, Validators.required),
    password: this.fb.control(null, Validators.required)
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.valid) {
      this.login.emit(this.form.value);
    } else {
      showFormErrors(this.form);
    }
  }
}
