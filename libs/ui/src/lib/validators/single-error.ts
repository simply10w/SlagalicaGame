import { ValidatorFn, AbstractControl } from '@angular/forms';

export function singleError(validators: ValidatorFn[]) {
  return (control: AbstractControl) => {
    let error = null;
    for (let i = 0; i < validators.length; i++) {
      error = validators[i](control);
      if (error) return error;
    }
    return error;
  };
}
