import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { createSelector, Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { User } from './user.model';
import { PaginatorComponent } from '../shared/paginator.component';
import { SearchBoxComponent } from '../shared/search-box.component';
import { UserListComponent } from './components/user-list.component';
import { UserFormComponent } from './components/user-form.component';
import { usersPageActions } from './actions/users-page.actions';
import {
  selectIsCreating,
  selectIsLoading,
  selectIsUpdating,
  selectQuery,
  selectSelectedPageSize,
  selectSelectedUser,
  selectSelectedUserId,
  selectUsers,
} from './state/users.selectors';

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
  ],
  template: `
    <h1>Users</h1>

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

      <h2>Create User:</h2>
      <app-user-form
        [isSaving]="vm.isCreating"
        (save)="onCreateUser($event)"
      ></app-user-form>

      <h2>Update User:</h2>
      <app-user-form
        [user]="vm.selectedUser"
        [isSaving]="vm.isUpdating"
        (save)="onUpdateUser($event)"
      ></app-user-form>
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

  onUpdateSelectedUserId(selectedUserId: number): void {
    this.store.dispatch(
      usersPageActions.selectedUserChanged({ selectedUserId })
    );
  }

  onCreateUser(user: Omit<User, 'id'>): void {
    // this.usersStore.createUser(user);
  }

  onUpdateUser(user: Omit<User, 'id'>): void {
    // this.usersStore.updateUser(user);
  }
}

const selectUsersPageViewModel = createSelector({
  users: selectUsers,
  query: selectQuery,
  selectedUserId: selectSelectedUserId,
  selectedUser: selectSelectedUser,
  selectedPageSize: selectSelectedPageSize,
  isLoading: selectIsLoading,
  isCreating: selectIsCreating,
  isUpdating: selectIsUpdating,
});
