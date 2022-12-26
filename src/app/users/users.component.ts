import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetModule } from '@ngrx/component';
import { UsersStore } from './users.store';
import { User } from './user.model';
import { PaginatorComponent } from '../shared/paginator.component';
import { SearchBoxComponent } from '../shared/search-box.component';
import { UserListComponent } from './components/user-list.component';
import { UserFormComponent } from './components/user-form.component';

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
  providers: [UsersStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly usersStore = inject(UsersStore);

  readonly vm$ = this.usersStore.vm$;

  onUpdateSelectedPageSize(selectedPageSize: number): void {
    this.usersStore.patchState({ selectedPageSize });
  }

  onUpdateQuery(query: string): void {
    this.usersStore.patchState({ query });
  }

  onUpdateSelectedUserId(selectedUserId: number): void {
    this.usersStore.patchState({ selectedUserId });
  }

  onCreateUser(user: Omit<User, 'id'>): void {
    this.usersStore.createUser(user);
  }

  onUpdateUser(user: Omit<User, 'id'>): void {
    this.usersStore.updateUser(user);
  }
}
