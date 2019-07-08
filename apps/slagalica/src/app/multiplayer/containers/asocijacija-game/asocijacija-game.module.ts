import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { AsocijacijaGameComponent } from './asocijacija-game.component';

@NgModule({
  imports: [SharedModule],
  exports: [AsocijacijaGameComponent],
  declarations: [AsocijacijaGameComponent]
})
export class AsocijacijaGameModule {}
