import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material/snack-bar';
import { NxModule } from '@nrwl/angular';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions
} from '@angular/material/form-field';

import {
  LayoutComponent,
  NavItemComponent,
  ToolbarComponent,
  HasPermissionDirective
} from '@slagalica-app/core/components';
import { AppComponent } from '@slagalica-app/core/containers';
import { SharedModule } from '@slagalica-app/shared';
export const COMPONENTS = [
  AppComponent,
  LayoutComponent,
  NavItemComponent,
  ToolbarComponent,
  HasPermissionDirective
];

@NgModule({
  imports: [
    HttpClientModule,
    NxModule.forRoot(),
    MatDialogModule,
    MatSnackBarModule,
    SharedModule
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: <MatFormFieldDefaultOptions>{
        appearance: 'outline'
      }
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } }
  ]
})
export class CoreModule {}
