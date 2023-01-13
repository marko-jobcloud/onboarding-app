import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { UsersComponent } from './containers/users.component';
import { CreateUserComponent } from './containers/create-user.component';
import { UpdateUserComponent } from './containers/update-user.component';
import { usersFeature } from './state';
import { UsersApiEffects } from './effects/users-api.effects';
import { UsersNotificationEffects } from './effects/users-notification.effects';
import { UsersRoutingEffects } from './effects/users-routing.effects';

const usersRoutes: Route[] = [
  {
    path: '',
    children: [
      { path: '', component: UsersComponent, title: 'Users' },
      { path: 'create', component: CreateUserComponent, title: 'Create User' },
      { path: 'edit/:id', component: UpdateUserComponent, title: 'Edit User' },
    ],
    providers: [
      provideState(usersFeature),
      provideEffects(
        UsersApiEffects,
        UsersNotificationEffects,
        UsersRoutingEffects
      ),
    ],
  },
];

export default usersRoutes;
