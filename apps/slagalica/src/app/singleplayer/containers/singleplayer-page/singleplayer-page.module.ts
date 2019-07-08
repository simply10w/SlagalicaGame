import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { GameModule } from '../game';
import { SingleplayerPageComponent } from './singleplayer-page.component';

@NgModule({
  imports: [SharedModule, GameModule],
  exports: [SingleplayerPageComponent],
  declarations: [SingleplayerPageComponent]
})
export class SingleplayerPageModule {}
