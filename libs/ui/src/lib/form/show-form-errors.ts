import { FormGroup } from '@angular/forms';

export function showFormErrors(form: FormGroup) {
  form.markAllAsTouched();
}
