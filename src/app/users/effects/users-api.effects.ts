import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UsersService } from '../users.service';
import { userCreatePageActions } from '../actions/user-create-page.actions';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { usersApiActions } from '../actions/users-api.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { userEditPageActions } from '../actions/user-edit-page.actions';
import { usersPageActions } from '../actions/users-page.actions';
import { selectRouteParam } from '../../shared/router.selectors';
import { usersFeature } from '../users.state';

export const createUser = createEffect(
  (actions$ = inject(Actions), userService = inject(UsersService)) => {
    return actions$.pipe(
      ofType(userCreatePageActions.formSubmitted),
      switchMap(({ user }) => {
        return userService.create(user).pipe(
          map((user) => usersApiActions.userCreatedSuccess({ user })),
          catchError((err: HttpErrorResponse) =>
            of(usersApiActions.userCreatedFailure({ errorMsg: err.message }))
          )
        );
      })
    );
  },
  { functional: true }
);

export const updateUser = createEffect(
  (actions$ = inject(Actions), userService = inject(UsersService)) => {
    return actions$.pipe(
      ofType(userEditPageActions.formSubmitted),
      switchMap(({ user }) => {
        return userService.update(user).pipe(
          map((user) => usersApiActions.userEditedSuccess({ user })),
          catchError((err: HttpErrorResponse) =>
            of(usersApiActions.userEditedFailure({ errorMsg: err.message }))
          )
        );
      })
    );
  },
  { functional: true }
);

export const loadUsers = createEffect(
  (
    actions$ = inject(Actions),
    userService = inject(UsersService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(
        usersPageActions.opened,
        usersPageActions.queryChanged,
        usersPageActions.pageSizeChanged
      ),
      concatLatestFrom(() => store.select(usersFeature.selectFilter)),
      switchMap(([, filter]) => {
        return userService.getByFilter(filter).pipe(
          map((users) => usersApiActions.usersLoadedSuccess({ users })),
          catchError((error: HttpErrorResponse) =>
            of(usersApiActions.usersLoadedFailure({ errorMsg: error.message }))
          )
        );
      })
    );
  },
  { functional: true }
);

export const loadUserById = createEffect(
  (
    actions$ = inject(Actions),
    userService = inject(UsersService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(userEditPageActions.opened),
      concatLatestFrom(() => store.select(usersFeature.selectEntityFromRoute)),
      filter(([, user]) => !user),
      concatLatestFrom(() => store.select(selectRouteParam('id'))),
      switchMap(([, id]) => {
        return userService.getById(Number(id)).pipe(
          map((user) => usersApiActions.userLoadedSuccess({ user })),
          catchError((err: HttpErrorResponse) =>
            of(usersApiActions.userLoadedFailure({ errorMsg: err.message }))
          )
        );
      })
    );
  },
  { functional: true }
);
