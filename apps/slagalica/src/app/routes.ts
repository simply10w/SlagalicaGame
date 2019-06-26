import { Route } from '@angular/router';
import { LandingPageComponent } from './landing-page';

export const routes: Route[] = [
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'landing'
  }
];
