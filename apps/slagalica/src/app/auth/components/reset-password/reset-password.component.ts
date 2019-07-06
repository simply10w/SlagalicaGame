import {
  Component,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  showFormErrors,
  validateStrongPassword,
  singleError
} from '@slagalica/ui';
import { ResetPasswordDto } from '@slagalica/data';

@Component({
  selector: 'sla-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
  @Output() resetPassword = new EventEmitter<ResetPasswordDto>();

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
    currentPassword: this.fb.control(null, Validators.required),
    newPassword: this.fb.control(
      null,
      singleError([Validators.required, validateStrongPassword])
    )
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.valid) {
      this.resetPassword.emit(this.form.value);
    } else {
      showFormErrors(this.form);
    }
  }
}
