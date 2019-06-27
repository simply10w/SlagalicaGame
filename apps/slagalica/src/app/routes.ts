import { Route } from '@angular/router';
import { HomePageComponent } from './home-page';
import { LandingPageComponent } from './auth/containers';

export const routes: Route[] = [
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'supervizor',
    loadChildren: () =>
      import('./supervizor/supervizor.module').then(m => m.SupervizorModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'landing'
  }
];
