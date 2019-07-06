import { strongPasswordRegexp } from '@slagalica/common';
import { AbstractControl } from '@angular/forms';

export function validateStrongPassword(control: AbstractControl) {
  if (!control.touched) return null;
  return !strongPasswordRegexp.test(control.value) ? { password: true } : null;
}
