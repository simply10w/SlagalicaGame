import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

export const staggerIn = trigger('staggerIn', [
  transition('* => *', [
    query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), {
      optional: true
    }),
    query(
      ':enter',
      stagger('50ms', [
        animate('150ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))
      ]),
      {
        optional: true
      }
    )
  ])
]);
