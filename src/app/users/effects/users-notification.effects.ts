import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, withLatestFrom } from 'rxjs';
import { createUserActions } from '../actions/create-users-page.action';
import { updateUserAction } from '../actions/update-user-page.action';
import { usersApiActions } from '../actions/users-api.actions';

@Injectable()
export class UsersNotificationEffects {
  private readonly actions$ = inject(Actions);

  readonly displayFailureNotification$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          usersApiActions.usersLoadedFailure,
          createUserActions.userSavedFail,
          updateUserAction.userUpdateFail
        ),
        tap(({ errorMsg }) => alert(errorMsg))
      );
    },
    { dispatch: false }
  );

  readonly displaySuccessNotification$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          createUserActions.userSavedSuccess,
          updateUserAction.userUpdateSuccess
        ),
        tap((message) => alert(message.successMsg))
      );
    },
    { dispatch: false }
  );
}
