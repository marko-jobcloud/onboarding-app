import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { usersApiActions } from '../actions/users-api.actions';

@Injectable()
export class UsersNotificationEffects {
  private readonly actions$ = inject(Actions);

  readonly displayFailureNotification$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(usersApiActions.usersLoadedFailure),
        tap(({ errorMsg }) => alert(errorMsg))
      );
    },
    { dispatch: false }
  );
}
