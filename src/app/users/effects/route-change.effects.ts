import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { updateUserAction } from '../actions/update-user-page.action';

@Injectable()
export class RouteChangeEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  readonly onRouteChange$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(routerNavigationAction),
        tap(({ payload }) => {
          const queryParamId = payload.routerState.root.queryParams['id'];
          queryParamId
            ? this.store.dispatch(
                updateUserAction.selectUser({ selectedUserId: +queryParamId })
              )
            : null;
        })
      );
    },
    { dispatch: false }
  );
}
