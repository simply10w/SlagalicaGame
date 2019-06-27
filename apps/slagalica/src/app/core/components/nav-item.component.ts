import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sla-nav-item',
  template: `
    <a
      [routerLink]="routerLink"
      [routerLinkActive]="activeClass"
      (click)="navigate.emit()"
    >
      <span><ng-content></ng-content></span
    ></a>
  `,
  styles: [
    `
      a {
        color: #fff;
      }

      .active {
        text-decoration: underline;
      }
    `
  ]
})
export class NavItemComponent {
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
  get activeClass() {
    return this.routerLink ? 'active' : '';
  }
}
