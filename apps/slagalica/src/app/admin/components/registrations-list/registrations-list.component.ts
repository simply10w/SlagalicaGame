import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { User } from '@slagalica/data';
import { staggerIn } from '@slagalica/ui';

@Component({
  selector: 'sla-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [staggerIn]
})
export class RegistrationsListComponent {
  @Input() users: User[];
  @Output() accept = new EventEmitter<User>();
  @Output() reject = new EventEmitter<User>();

  trackByUser = (index: number, user: User) => user._id;
}
