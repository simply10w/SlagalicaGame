import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SkockoPositionResult } from '@slagalica/data';

@Component({
  selector: 'sla-skocko-tries',
  templateUrl: 'skocko-tries.component.html',
  styleUrls: ['./skocko-tries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkockoTriesComponent {
  /** TODO: type for tries */
  @Input() tries: {
    try: any[];
    result: any[];
  }[];

  SkockoPositionResult = SkockoPositionResult;

  trackByTry = (index: number) => index;
}
