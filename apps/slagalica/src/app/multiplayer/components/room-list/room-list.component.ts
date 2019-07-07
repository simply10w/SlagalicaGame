import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { AvailableRoom } from '@slagalica/data';
import { staggerIn } from '@slagalica/ui';

@Component({
  selector: 'sla-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [staggerIn]
})
export class RoomListComponent {
  @Input() rooms: AvailableRoom[];
  @Output() join = new EventEmitter<AvailableRoom>();

  trackByRoom = (index: number, room: AvailableRoom) => room.roomId;
}
