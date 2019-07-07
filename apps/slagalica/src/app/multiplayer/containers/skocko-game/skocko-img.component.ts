import { Component, OnInit, Input } from '@angular/core';
import { Skocko } from '@slagalica/data';

@Component({
  selector: 'sla-skocko-img',
  host: {
    class: 'sla-block'
  },
  styles: [
    `
      :host {
        text-align: center;
      }

      :host img {
        max-width: 30px;
      }
    `
  ],
  template: `
    <span><img [src]="imgUrl"/></span>
  `
})
export class SkockoImgComponent {
  @Input() set skocko(skocko: Skocko) {
    const prefix = 'assets/images/skocko';
    const ext = 'png';
    let icon: string;

    switch (skocko) {
      case Skocko.Herc:
        icon = 'diamond';
        break;
      case Skocko.Zvezda:
        icon = 'star';
        break;
      case Skocko.Srce:
        icon = 'hearts';
        break;
      case Skocko.Tref:
        icon = 'clubs';
        break;
      case Skocko.Pik:
        icon = 'spade';
        break;
      case Skocko.Skocko:
        icon = 'spring';
        break;
    }

    this.imgUrl = `${prefix}/${icon}.${ext}`;
  }

  imgUrl: string;
}
