import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { SkockoGameComponent } from './skocko-game.component';
import { SkockoImgComponent } from './skocko-img.component';
import { MainPlayerTriesPipe, SecondPlayerTriesPipe } from './tries.pipe';
import { SkockoTriesComponent } from './skocko-tries.component';
@NgModule({
  imports: [SharedModule],
  exports: [SkockoGameComponent],
  declarations: [
    SkockoGameComponent,
    SkockoImgComponent,
    MainPlayerTriesPipe,
    SecondPlayerTriesPipe,
    SkockoTriesComponent
  ]
})
export class SkockoGameModule {}
