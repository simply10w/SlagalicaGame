import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserGender, RegisterDto } from '@slagalica/data';
import {
  showFormErrors,
  validateStrongPassword,
  singleError
} from '@slagalica/ui';

@Component({
  selector: 'sla-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  @Output() register = new EventEmitter<RegisterDto>();

  @Input() errorMessage: string;

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  Gender = UserGender;

  form = this.fb.group(
    {
      firstName: this.fb.control(null, Validators.required),
      lastName: this.fb.control(null, Validators.required),
      userName: this.fb.control(null, Validators.required),
      email: this.fb.control(null, Validators.required),
      password: this.fb.control(
        null,
        singleError([Validators.required, validateStrongPassword])
      ),
      dateOfBirth: this.fb.control(null, Validators.required),
      gender: this.fb.control(null, Validators.required),
      profileImage: this.fb.control(null)
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.valid) {
      this.register.emit(this.form.value);
    } else {
      showFormErrors(this.form);
    }
  }
}
