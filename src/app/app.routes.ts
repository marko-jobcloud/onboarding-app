import { Routes } from '@angular/router';
import { CreateUserComponent } from './container/create-user.component';
import { HomeComponent } from './container/home.component';
import { UpdateUserComponent } from './container/update-user.component';
import { UsersComponent } from './container/users.component';

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'users',
    component: UsersComponent,
  },

  {
    path: 'create-user',
    component: CreateUserComponent,
  },

  {
    path: 'update-user',
    component: UpdateUserComponent,
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
