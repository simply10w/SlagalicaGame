import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sla-toolbar',
  template: `
    <mat-toolbar color="primary">
      <ng-content></ng-content>
    </mat-toolbar>
  `,
  styles: [
    `
      .mat-toolbar {
        justify-content: center;
      }

      ::ng-deep a {
        margin-right: 16px;
      }
    `
  ]
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
