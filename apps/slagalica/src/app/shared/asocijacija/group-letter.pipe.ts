import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slaGroupLetter'
})
export class GroupLetterPipe implements PipeTransform {
  transform(index: number): any {
    return String.fromCharCode(65 + index);
  }
}
