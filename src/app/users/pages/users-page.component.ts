import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LetModule } from "@ngrx/component";
import { createSelector, Store } from "@ngrx/store";
import { PaginatorComponent } from "src/app/shared/paginator.component";
import { SearchBoxComponent } from "src/app/shared/search-box.component";
import { usersPageActions } from "../actions/users-page.actions";
import { UserListComponent } from "../components/user-list.component";
import { selectIsLoading, selectQuery, selectSelectedPageSize, selectSelectedUserId, selectUsers } from "../state/users.selectors";


@Component({
    selector: 'app-users-page',
    standalone: true,
    imports: [
        CommonModule,
        LetModule,
        RouterModule,
        SearchBoxComponent,
        UserListComponent,
        PaginatorComponent
    ],
    template: `
        <h2>Users page</h2>

        <ng-container *ngrxLet="vm$ as vm">
            <app-search-box
                [query]="vm.query"
                (queryChange)="onUpdateQuery($event)"
            ></app-search-box>

            <span *ngIf="vm.isLoading">Loading...</span>

            <app-user-list
                [users]="vm.users"
                [selectedUserId]="vm.selectedUserId"
                (selectedUserIdChange)="onUpdateSelectedUserId($event)"
            ></app-user-list>

            <app-paginator
                [selectedPageSize]="vm.selectedPageSize"
                (selectedPageSizeChange)="onUpdateSelectedPageSize($event)"
            ></app-paginator>
        </ng-container>

        <div>
            <a routerLink="/">Home</a><br>
            <a routerLink="/create">Create new user</a>
        </div>
    `,
    styles: [
        `div { margin: 20px 0 }`,
    ]
})
export class UsersPageComponent implements OnInit {
    private readonly store = inject(Store);

    readonly vm$ = this.store.select(selectUsersPageViewModel);

    ngOnInit(): void {
        this.store.dispatch(usersPageActions.opened());
    }

    onUpdateSelectedPageSize(selectedPageSize: number): void {
        this.store.dispatch(usersPageActions.pageSizeChanged({ selectedPageSize }));
    }

    onUpdateQuery(query: string): void {
        this.store.dispatch(usersPageActions.queryChanged({ query }));
    }

    onUpdateSelectedUserId(selectedUserId: number): void {
        this.store.dispatch(
            usersPageActions.selectedUserChanged({ selectedUserId })
        );
    }
}

const selectUsersPageViewModel = createSelector({
    users: selectUsers,
    query: selectQuery,
    selectedUserId: selectSelectedUserId,
    selectedPageSize: selectSelectedPageSize,
    isLoading: selectIsLoading,
});