import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { RoomListComponent } from './room-list.component';

@NgModule({
  imports: [SharedModule],
  exports: [RoomListComponent],
  declarations: [RoomListComponent]
})
export class RoomListModule {}
