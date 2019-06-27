import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { PlayerPageComponent } from './player-page.component';

@NgModule({
  imports: [SharedModule],
  exports: [PlayerPageComponent],
  declarations: [PlayerPageComponent]
})
export class PlayerPageModule {}
