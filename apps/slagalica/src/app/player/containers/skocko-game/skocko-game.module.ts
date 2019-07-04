import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { SkockoGameComponent } from './skocko-game.component';

@NgModule({
  imports: [SharedModule],
  exports: [SkockoGameComponent],
  declarations: [SkockoGameComponent]
})
export class SkockoGameModule {}
