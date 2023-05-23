import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { usersFeature } from './users.state';
import { provideEffects } from '@ngrx/effects';
import * as usersRoutingEffects from './effects/users-routing.effects';
import * as usersApiEffects from './effects/users-api.effects';

const usersRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./containers/users.component'),
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./containers/user-edit.component'),
      },
      {
        path: 'create',
        loadComponent: () => import('./containers/user-create.component'),
      },
    ],
    providers: [
      provideState(usersFeature),
      provideEffects(usersApiEffects, usersRoutingEffects),
    ],
  },
];

export default usersRoutes;
