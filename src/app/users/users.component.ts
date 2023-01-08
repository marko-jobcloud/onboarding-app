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
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  
}
