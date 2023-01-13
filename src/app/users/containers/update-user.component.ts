import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { createSelector, Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { UserFormComponent } from '../components/user-form.component';
import { usersSelectors } from '../state';
import { updateUserPageActions } from '../actions/update-user-page.actions';
import { User } from '../user.model';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [LetModule, CommonModule, UserFormComponent],
  template: `
    <h1>Update User</h1>

    <ng-container *ngrxLet="vm$ as vm">
      <app-user-form
        *ngIf="vm.user; else loading"
        [user]="vm.user"
        [isSaving]="vm.isUpdating"
        (save)="onUpdateUser($event, vm.user.id)"
      ></app-user-form>

      <ng-template #loading>
        <p>Loading...</p>
      </ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent implements OnInit {
  private readonly store = inject(Store);
  readonly vm$ = this.store.select(selectUpdateUserPageViewModel);

  ngOnInit(): void {
    this.store.dispatch(updateUserPageActions.opened());
  }

  onUpdateUser(updatedUser: Omit<User, 'id'>, id: number): void {
    this.store.dispatch(
      updateUserPageActions.userFormSubmitted({ user: { ...updatedUser, id } })
    );
  }
}

const selectUpdateUserPageViewModel = createSelector({
  user: usersSelectors.selectEntityFromRoute,
  isUpdating: usersSelectors.selectIsUpdatePending,
});
