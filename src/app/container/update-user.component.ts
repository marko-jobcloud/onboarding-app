import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { UserFormComponent } from '../users/components/user-form.component';
import { User } from '../users/user.model';
import {
  selectIsLoading,
  selectIsUpdating,
  selectSelectedUser,
} from './../users/state/users.selectors';
import { LetModule } from '@ngrx/component';
import { createSelector, Store } from '@ngrx/store';
import { updateUserAction } from '../users/actions/update-user-page.action';
import { RouterLink } from '@angular/router';
import { usersPageActions } from '../users/actions/users-page.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'update-user',
  standalone: true,
  imports: [UserFormComponent, LetModule, RouterLink, CommonModule],
  template: `
    <ng-container *ngrxLet="vm$ as vm">
      <button routerLink="/users" [disabled]="vm.isUpdating">Back</button>

      <h2>Update User:</h2>
      <app-user-form
        *ngIf="!vm.isLoading; else loading"
        (save)="onUpdateUser($event)"
        [isSaving]="vm.isUpdating"
        [user]="vm.selectedUser"
      ></app-user-form>

      <ng-template #loading>...Loading</ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent implements OnInit {
  private readonly store = inject(Store);

  readonly vm$ = this.store.select(viewModel);

  ngOnInit(): void {
    this.store.dispatch(usersPageActions.opened());
  }

  onUpdateUser(user: Omit<User, 'id'>): void {
    this.store.dispatch(updateUserAction.updateUser({ user }));
  }
}

const viewModel = createSelector({
  isUpdating: selectIsUpdating,
  selectedUser: selectSelectedUser,
  isLoading: selectIsLoading,
});
