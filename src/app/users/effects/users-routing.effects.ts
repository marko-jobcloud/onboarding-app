import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { usersApiActions } from '../actions/users-api.actions';

@Injectable()
export class UsersRoutingEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);

  readonly navigateToNotFoundPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(usersApiActions.userLoadedFailure),
        tap(() => this.router.navigateByUrl('/user-not-found'))
      );
    },
    { dispatch: false }
  );

  readonly navigateToUsersPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          usersApiActions.userCreatedSuccess,
          usersApiActions.userUpdatedSuccess
        ),
        tap(() => this.router.navigateByUrl('/users'))
      );
    },
    { dispatch: false }
  );
}
