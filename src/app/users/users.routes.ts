import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { usersFeature } from './users.state';

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
    ],
    providers: [provideState(usersFeature)],
  },
];

export default usersRoutes;
