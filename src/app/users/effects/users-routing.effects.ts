import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { usersApiActions } from '../actions/users-api.actions';
import { tap } from 'rxjs';

export const navigateToUsersPage = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(
        usersApiActions.userCreatedSuccess,
        usersApiActions.userEditedSuccess
      ),
      tap(() => router.navigateByUrl('/users'))
    );
  },
  { dispatch: false, functional: true }
);
