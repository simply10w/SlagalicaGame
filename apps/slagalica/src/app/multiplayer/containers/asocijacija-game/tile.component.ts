import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'sla-tile-component',
  template: `
    <button *ngIf="!tile" mat-button (click)="openTile.emit()">
      Open
    </button>
    <span>{{ tile }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  @Input() tile: string;
  @Output() openTile = new EventEmitter();
}
