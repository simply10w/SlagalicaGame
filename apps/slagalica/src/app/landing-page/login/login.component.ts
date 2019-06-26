import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { showFormErrors } from '@slagalica/ui';

@Component({
  selector: 'slagalica-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form = this.fb.group({
    userName: this.fb.control(null, Validators.required),
    password: this.fb.control(null, Validators.required)
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      showFormErrors(this.form);
    }
  }
}
