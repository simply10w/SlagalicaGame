import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from './logout-confirmation.component';

@NgModule({
  imports: [MatDialogModule],
  exports: [LogoutConfirmationDialogComponent],
  declarations: [LogoutConfirmationDialogComponent],
  entryComponents: [LogoutConfirmationDialogComponent]
})
export class LogoutConfirmationModule {}
