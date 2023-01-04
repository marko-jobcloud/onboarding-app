import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { createUserActions } from '../actions/create-users-page.action';
import { updateUserAction } from '../actions/update-user-page.action';
import { selectSelectedUserId } from '../state/users.selectors';
import { UsersService } from '../users.service';

@Injectable()
export class SaveUserEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);
  private readonly store = inject(Store);

  readonly createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createUserActions.saveUser),
      exhaustMap(({ user }) => {
        return this.usersService.createUser(user).pipe(
          map((user) =>
            createUserActions.userSavedSuccess({
              successMsg: `User ${user.firstName} ${user.lastName} saved successfully`,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(createUserActions.userSavedFail({ errorMsg: error.message }))
          )
        );
      })
    );
  });

  readonly updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserAction.updateUser),
      withLatestFrom(this.store.select(selectSelectedUserId)),
      exhaustMap(([{ user }, id]) => {
        return this.usersService.updateUser({ ...user, id: id! }).pipe(
          map((user) =>
            updateUserAction.userUpdateSuccess({
              successMsg: `User with id: ${user.id} updated successfully`,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(updateUserAction.userUpdateFail({ errorMsg: error.message }))
          )
        );
      })
    );
  });
}
