import { Route } from '@angular/router';
import { UserType } from '@slagalica/data';
import { LandingPageComponent } from '@slagalica-app/auth/containers';
import { PermissionsGuard } from '@slagalica-app/core/guards';
import { HomePageComponent } from '@slagalica-app/home-page';

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
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: {
      permissions: [UserType.Admin]
    },
    canActivate: [PermissionsGuard]
  },
  {
    path: 'supervizor',
    loadChildren: () =>
      import('./supervizor/supervizor.module').then(m => m.SupervizorModule),
    data: {
      permissions: [UserType.Supervizor]
    },
    canActivate: [PermissionsGuard]
  },
  {
    path: 'multiplayer',
    loadChildren: () =>
      import('./multiplayer/multiplayer.module').then(m => m.MultiplayerModule),
    data: {
      permissions: [UserType.Igrac]
    },
    canActivate: [PermissionsGuard]
  },
  {
    path: 'singleplayer',
    loadChildren: () =>
      import('./singleplayer/singleplayer.module').then(
        m => m.SingleplayerModule
      ),
    data: {
      permissions: [UserType.Igrac]
    },
    canActivate: [PermissionsGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'landing'
  }
];
