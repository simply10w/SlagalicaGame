import { NgModule } from '@angular/core';
import { RoomListModule } from '@slagalica-app/player/components';
import { SharedModule } from '@slagalica-app/shared';
import { PlayerPageComponent } from './player-page.component';

@NgModule({
  imports: [SharedModule, RoomListModule],
  exports: [PlayerPageComponent],
  declarations: [PlayerPageComponent]
})
export class PlayerPageModule {}
