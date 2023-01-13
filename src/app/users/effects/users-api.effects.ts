import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../users.service';
import { usersPageActions } from '../actions/users-page.actions';
import { usersApiActions } from '../actions/users-api.actions';
import { updateUserPageActions } from '../actions/update-user-page.actions';
import { createUserPageActions } from '../actions/create-user-page.actions';
import { usersSelectors } from '../state';
import { selectRouteParam } from '../../shared/state/router.selectors';

@Injectable()
export class UsersApiEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly usersService = inject(UsersService);

  readonly loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        usersPageActions.opened,
        usersPageActions.queryChanged,
        usersPageActions.pageSizeChanged
      ),
      concatLatestFrom(() => this.store.select(usersSelectors.selectFilter)),
      switchMap(([, filter]) => {
        return this.usersService.getByFilter(filter).pipe(
          map((users) => usersApiActions.usersLoadedSuccess({ users })),
          catchError((error: HttpErrorResponse) =>
            of(usersApiActions.usersLoadedFailure({ error: error.message }))
          )
        );
      })
    );
  });

  readonly loadUserByIdIfNotLoaded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserPageActions.opened),
      concatLatestFrom(() =>
        this.store.select(usersSelectors.selectEntityFromRoute)
      ),
      filter(([, user]) => !user),
      concatLatestFrom(() => this.store.select(selectRouteParam('id'))),
      switchMap(([, userId]) => {
        return this.usersService.getById(Number(userId)).pipe(
          map((user) => usersApiActions.userLoadedSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(usersApiActions.userLoadedFailure({ error: error.message }))
          )
        );
      })
    );
  });

  readonly createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createUserPageActions.userFormSubmitted),
      switchMap(({ user }) => {
        return this.usersService.create(user).pipe(
          map((user) => usersApiActions.userCreatedSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(usersApiActions.userCreatedFailure({ error: error.message }))
          )
        );
      })
    );
  });

  readonly updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserPageActions.userFormSubmitted),
      switchMap(({ user }) => {
        return this.usersService.update(user).pipe(
          map((user) => usersApiActions.userUpdatedSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(usersApiActions.userUpdatedFailure({ error: error.message }))
          )
        );
      })
    );
  });
}
