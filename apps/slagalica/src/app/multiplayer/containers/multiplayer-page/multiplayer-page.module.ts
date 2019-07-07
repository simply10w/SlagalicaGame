import { NgModule } from '@angular/core';
import { RoomListModule } from '@slagalica-app/multiplayer/components';
import { SharedModule } from '@slagalica-app/shared';
import { GameModule } from '../game';
import { MultiplayerPageComponent } from './multiplayer-page.component';

@NgModule({
  imports: [SharedModule, RoomListModule, GameModule],
  exports: [MultiplayerPageComponent],
  declarations: [MultiplayerPageComponent]
})
export class MultiplayerPageModule {}
