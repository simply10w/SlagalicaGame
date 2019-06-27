import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { User } from '@slagalica/data';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'sla-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        // each time the binding value changes
        query(
          ':leave',
          [stagger(100, [animate('0.2s', style({ opacity: 0 }))])],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(100, [animate('0.2s', style({ opacity: 1 }))])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class RegistrationsListComponent {
  @Input() users: User[];
  @Output() accept = new EventEmitter<User>();
  @Output() reject = new EventEmitter<User>();
}
