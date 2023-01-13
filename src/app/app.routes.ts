import { Route } from '@angular/router';
import { HomeComponent } from './core/home.component';
import { NotFoundComponent } from './core/not-found.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'users', loadChildren: () => import('./users/users.routes') },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
