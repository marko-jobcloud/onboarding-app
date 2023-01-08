import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { usersPageActions } from "../actions/users-page.actions";

export class UsersRouterActions {
    private readonly actions$ = inject (Actions);
    private readonly router = inject (Router);

    readonly navigateToSelectedUser$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(
                    usersPageActions.selectedUserChanged
                ),
                tap(({selectedUserId}) => {
                    this.router.navigate(['/update', { id: selectedUserId }])
                })
            )
        }
    )
}