import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { createSelector, Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { PaginatorComponent } from '../shared/paginator.component';
import { SearchBoxComponent } from '../shared/search-box.component';
import { UserListComponent } from '../users/components/user-list.component';
import { UserFormComponent } from '../users/components/user-form.component';
import { usersPageActions } from '../users/actions/users-page.actions';
import {
  selectIsLoading,
  selectQuery,
  selectSelectedPageSize,
  selectUsers,
} from '../users/state/users.selectors';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    PaginatorComponent,
    SearchBoxComponent,
    UserListComponent,
    UserFormComponent,
    RouterLink,
  ],
  template: `
    <h1>Users</h1>

    <ng-container *ngrxLet="vm$ as vm">
      <app-search-box
        [query]="vm.query"
        (queryChange)="onUpdateQuery($event)"
      ></app-search-box>
      <span *ngIf="vm.isLoading; else users">Loading...</span>

      <ng-template #users>
        <button routerLink="/create-user">Create User</button>

        <app-user-list [users]="vm.users"></app-user-list>

        <app-paginator
          [selectedPageSize]="vm.selectedPageSize"
          (selectedPageSizeChange)="onUpdateSelectedPageSize($event)"
        ></app-paginator>
      </ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
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
}

const selectUsersPageViewModel = createSelector({
  users: selectUsers,
  query: selectQuery,
  selectedPageSize: selectSelectedPageSize,
  isLoading: selectIsLoading,
});
