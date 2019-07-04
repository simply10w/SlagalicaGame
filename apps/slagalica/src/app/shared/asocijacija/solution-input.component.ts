import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  ControlValueAccessor,
  Validator,
  AbstractControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';
import { isArray, size } from 'lodash';

@Component({
  selector: 'sla-solution-input',
  templateUrl: 'solution-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SolutionInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SolutionInputComponent),
      multi: true
    }
  ]
})
export class SolutionInputComponent implements ControlValueAccessor, Validator {
  @Input() placeholder: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  touched = false;
  error: any;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  solutions: string[] = [];
  private _onChange = (solutions: string[]) => {};
  private _onTouch = () => {};
  private _onValidatorChange = () => {};

  constructor(private cd: ChangeDetectorRef) {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add solution
    if ((value || '').trim()) {
      this.solutions.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this._onChange(this.solutions);
    this._onValidatorChange();
    this._onTouch();
  }

  remove(solution: string): void {
    const index = this.solutions.indexOf(solution);

    if (index >= 0) {
      this.solutions.splice(index, 1);
    }

    this._onChange(this.solutions);
    this._onValidatorChange();
    this._onTouch();
  }

  writeValue(value: string[]) {
    this.solutions = value || [];
    this.cd.markForCheck();
  }

  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouch = () => {
      this.touched = true;
      fn();
    };
  }

  registerOnValidatorChange(fn: any) {
    this._onValidatorChange = fn;
  }

  validate(control: AbstractControl) {
    this.error =
      isArray(this.solutions) && size(this.solutions) > 0
        ? null
        : { solution: false };

    return this.error;
  }
}
