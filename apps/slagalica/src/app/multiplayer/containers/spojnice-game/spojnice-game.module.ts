import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { SpojniceGameComponent } from './spojnice-game.component';

@NgModule({
  imports: [SharedModule],
  exports: [SpojniceGameComponent],
  declarations: [SpojniceGameComponent]
})
export class SpojniceGameModule {}
