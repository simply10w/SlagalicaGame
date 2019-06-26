import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { readBlob } from '../file/read-blob';

@Component({
  selector: 'slagalica-ui-profile-img',
  templateUrl: './profile-img.component.html',
  styleUrls: ['./profile-img.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileImgComponent),
      multi: true
    }
  ]
})
export class ProfileImgComponent implements ControlValueAccessor {
  @Input() progress;
  onChange: Function;

  file: File | null = null;

  thumbnail$: Observable<string>;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    this.thumbnail$ = file ? readBlob(file) : of(null);
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
    this.thumbnail$ = of(null);
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}
}
