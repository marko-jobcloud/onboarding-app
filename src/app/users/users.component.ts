import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetModule } from '@ngrx/component';
import { UsersStore } from './users.store';
import { PaginatorComponent } from '../shared/paginator.component';
import { SearchBoxComponent } from '../shared/search-box.component';
import { UserListComponent } from './components/user-list.component';
import { UserFormComponent } from './components/user-form.component';
import { User } from './user.model';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorComponent,
    SearchBoxComponent,
    UserListComponent,
    UserFormComponent,
    LetModule,
  ],
  template: `
    <h1>Users</h1>

    <ng-container *ngrxLet="vm$ as vm">
      <app-search-box
        [query]="vm.query"
        (queryChange)="onUpdateQuery($event)"
      ></app-search-box>

      <span class="spinner" *ngIf="vm.isLoading">Loading...</span>

      <app-user-list 
        [users]="vm.users"
        [selectedUserId]="vm.selectedUserId"
        (selectUser)="onSelectUser($event)">
      </app-user-list>      

      <app-paginator
        [selectedPageSize]="vm.selectedPageSize"
        (selectedPageSizeChange)="onUpdateSelectedPageSize($event)"
      ></app-paginator>

      <h2>Create user</h2>
      <app-user-form 
        [isDisabled]="vm.isDisabledCreateButton"
        (save)="onCreateUser($event)">
      </app-user-form>

      <h2>Update user</h2>
      <app-user-form
        [user]="vm.selectedUser"
        [isDisabled]="vm.isDisabledUpdateButton"
        (save)="onUpdateUser($event)">
      </app-user-form>
    </ng-container>
  `,
  styles: ['.spinner { margin: 20px 0; }'],
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

  onSelectUser(selectedUserId: number): void {
    this.usersStore.patchState({ selectedUserId });
  }

  onCreateUser(user: Omit<User, 'id'>): void {
    this.usersStore.createUser(user);
  }

  onUpdateUser(user: Omit<User, 'id'>): void {
    this.usersStore.updateUser(user);
  }
}
