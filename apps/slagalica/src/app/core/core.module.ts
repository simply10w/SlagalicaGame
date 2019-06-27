import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NxModule } from '@nrwl/angular';

@NgModule({
  imports: [
    HttpClientModule,
    NxModule.forRoot(),
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [],
  declarations: [],
  providers: []
})
export class CoreModule {}
