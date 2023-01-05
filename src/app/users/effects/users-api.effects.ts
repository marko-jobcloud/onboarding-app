import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../users.service';
import { usersPageActions } from '../actions/users-page.actions';
import { usersApiActions } from '../actions/users-api.actions';
import { selectQuery, selectSelectedPageSize, selectSelectedUserId } from '../state/users.selectors';
import { User } from '../user.model';

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
      concatLatestFrom(() => [
        this.store.select(selectQuery),
        this.store.select(selectSelectedPageSize),
      ]),
      switchMap(([, query, pageSize]) => {
        return this.usersService.getUsers(query, pageSize).pipe(
          map((users) => usersApiActions.usersLoadedSuccess({ users })),
          catchError((error: HttpErrorResponse) =>
            of(usersApiActions.usersLoadedFailure({ errorMsg: error.message }))
          )
        );
      })
    );
  });

  readonly createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(usersPageActions.createUser),
      exhaustMap(({user}) => {
        return this.usersService.createUser(user).pipe(
          map(() => usersApiActions.userCreatedSuccess({ msg: 'Successfully created' })),
          catchError((error: HttpErrorResponse) => 
            of(usersApiActions.userCreatedFailure({ errorMsg: error.message }))
          )
        )
      })
    )
  });

  readonly updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(usersPageActions.updateUser),
      concatLatestFrom(() => [
        this.store.select(selectSelectedUserId)
      ]),
      exhaustMap(([{user}, selectedUserId]) => {
        return this.usersService.updateUser({ ...user, id: selectedUserId! }).pipe(
          map(() => usersApiActions.userUpdatedSuccess({ msg: 'Successfully updated' })),
          catchError((error: HttpErrorResponse) => 
            of(usersApiActions.userUpdatedFailure({ errorMsg: error.message }))
          )
        )
      })
    )
  });
}
