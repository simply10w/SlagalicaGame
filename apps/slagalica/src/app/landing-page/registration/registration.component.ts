import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserGender } from '@slagalica/data';
import { showFormErrors } from '@slagalica/ui';

@Component({
  selector: 'slagalica-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  Gender = UserGender;

  form = this.fb.group({
    firstName: this.fb.control(null, Validators.required),
    lastName: this.fb.control(null, Validators.required),
    userName: this.fb.control(null, Validators.required),
    email: this.fb.control(null, Validators.required),
    password: this.fb.control(null, Validators.required),
    dateOfBirth: this.fb.control(null, Validators.required),
    gender: this.fb.control(null, Validators.required),
    profileImage: this.fb.control(null)
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      showFormErrors(this.form);
    }
  }
}
