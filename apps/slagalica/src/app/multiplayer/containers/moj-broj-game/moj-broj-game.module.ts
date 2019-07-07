import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { MojBrojGameComponent } from './moj-broj-game.component';

@NgModule({
  imports: [SharedModule],
  exports: [MojBrojGameComponent],
  declarations: [MojBrojGameComponent]
})
export class MojBrojGameModule {}
