import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { SlagalicaGameComponent } from './slagalica-game.component';

@NgModule({
  imports: [SharedModule],
  exports: [SlagalicaGameComponent],
  declarations: [SlagalicaGameComponent]
})
export class SlagalicaGameModule {}
