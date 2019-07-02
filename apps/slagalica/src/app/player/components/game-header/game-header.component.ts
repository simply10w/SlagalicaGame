import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'sla-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameHeaderComponent {
  @Input() red: any;
  @Input() blue: any;
}
