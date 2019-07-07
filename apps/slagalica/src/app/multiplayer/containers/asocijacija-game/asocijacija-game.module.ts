import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { AsocijacijaGameComponent } from './asocijacija-game.component';
import { TileComponent } from './tile.component';

@NgModule({
  imports: [SharedModule],
  exports: [AsocijacijaGameComponent],
  declarations: [AsocijacijaGameComponent, TileComponent]
})
export class AsocijacijaGameModule {}
