import { Pipe, PipeTransform } from '@angular/core';
import { slice } from 'lodash';

@Pipe({
  name: 'slaMainPlayerTries',
  pure: false
})
export class MainPlayerTriesPipe implements PipeTransform {
  transform(value: any[]): any {
    return slice(value, 0, 6);
  }
}

@Pipe({
  name: 'slaSecondPlayerTries',
  pure: false
})
export class SecondPlayerTriesPipe implements PipeTransform {
  transform(value: any[]): any {
    return slice(value, 6);
  }
}
