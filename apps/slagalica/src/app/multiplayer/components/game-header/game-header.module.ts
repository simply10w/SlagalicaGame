import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { GameHeaderComponent } from './game-header.component';

@NgModule({
  imports: [SharedModule],
  exports: [GameHeaderComponent],
  declarations: [GameHeaderComponent]
})
export class GameHeaderModule {}
