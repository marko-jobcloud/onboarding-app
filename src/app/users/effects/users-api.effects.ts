import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../users.service';
import { usersPageActions } from '../actions/users-page.actions';
import { usersApiActions } from '../actions/users-api.actions';
import { selectQuery, selectSelectedPageSize } from '../state/users.selectors';

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
}
