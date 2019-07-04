import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { SkockoGameComponent } from './skocko-game.component';
import { SkockoImgComponent } from './skocko-img.component';

@NgModule({
  imports: [SharedModule],
  exports: [SkockoGameComponent],
  declarations: [SkockoGameComponent, SkockoImgComponent]
})
export class SkockoGameModule {}
