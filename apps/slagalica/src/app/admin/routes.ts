import { AdminPageComponent } from './containers/admin-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    data: { title: 'Admin Page' }
  }
];
