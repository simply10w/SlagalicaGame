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
    path: '**',
    pathMatch: 'full',
    redirectTo: 'landing'
  }
];
