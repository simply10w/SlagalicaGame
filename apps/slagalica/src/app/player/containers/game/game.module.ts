import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { GameHeaderModule } from '@slagalica-app/player/components';
import { GameComponent } from './game.component';
import { SlagalicaGameModule } from '../slagalica-game';

@NgModule({
  imports: [SharedModule, SlagalicaGameModule, GameHeaderModule],
  exports: [GameComponent],
  declarations: [GameComponent]
})
export class GameModule {}
