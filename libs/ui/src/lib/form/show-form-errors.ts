import { FormGroup, AbstractControl } from '@angular/forms';
import { values } from 'lodash';

export function showFormErrors(form: FormGroup) {
  return values(form.controls).forEach(control => showControlError(control));
}

export function showControlError(control: AbstractControl) {
  control.markAsTouched();
  control.markAsDirty();
}
