import { NgModule } from '@angular/core';

import { ProfileImgComponent } from './profile-img.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  exports: [ProfileImgComponent],
  declarations: [ProfileImgComponent],
  providers: []
})
export class ProfileImgModule {}
