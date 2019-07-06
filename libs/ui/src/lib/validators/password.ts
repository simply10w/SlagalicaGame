import { isStrongPassword } from '@slagalica/common';
import { AbstractControl } from '@angular/forms';

export function validateStrongPassword(control: AbstractControl) {
  if (!control.touched) return null;
  return isStrongPassword(control.value) ? null : { password: true };
}
