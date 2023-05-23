import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { UserFormComponent } from '../components/user-form.component';
import { createSelector, Store } from '@ngrx/store';
import { userEditPageActions } from '../actions/user-edit-page.actions';
import { User } from '../user.model';
import { LetDirective } from '@ngrx/component';
import { CommonModule } from '@angular/common';
import { usersFeature } from '../users.state';

@Component({
  standalone: true,
  template: `
    <h1>Edit User</h1>
    <ng-container *ngrxLet="vm$ as vm">
      <app-user-form
        *ngIf="vm.user; else loading"
        [isSaving]="vm.isPending"
        [user]="vm.user"
        (save)="onUserEdit($event, vm.user.id)"
      ></app-user-form>
    </ng-container>

    <ng-template #loading>
      <p>Loading...</p>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserFormComponent, LetDirective, CommonModule],
})
export default class UserEditComponent implements OnInit {
  private readonly store = inject(Store);
  readonly vm$ = this.store.select(selectUserEditPageViewModel);

  ngOnInit(): void {
    this.store.dispatch(userEditPageActions.opened());
  }

  onUserEdit(updatedUser: Omit<User, 'id'>, id: number): void {
    this.store.dispatch(
      userEditPageActions.formSubmitted({ user: { ...updatedUser, id } })
    );
  }
}

const selectUserEditPageViewModel = createSelector({
  user: usersFeature.selectEntityFromRoute,
  isPending: usersFeature.selectIsPending,
});
