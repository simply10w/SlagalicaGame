import { NgModule } from '@angular/core';
import { RoomListModule } from '@slagalica-app/player/components';
import { SharedModule } from '@slagalica-app/shared';
import { GameModule } from '../game';
import { PlayerPageComponent } from './player-page.component';

@NgModule({
  imports: [SharedModule, RoomListModule, GameModule],
  exports: [PlayerPageComponent],
  declarations: [PlayerPageComponent]
})
export class PlayerPageModule {}
