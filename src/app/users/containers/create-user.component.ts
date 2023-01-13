import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { UserFormComponent } from '../components/user-form.component';
import { usersSelectors } from '../state';
import { User } from '../user.model';
import { createUserPageActions } from '../actions/create-user-page.actions';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [LetModule, UserFormComponent],
  template: `
    <h1>Create User</h1>

    <app-user-form
      *ngrxLet="isSaving$ as isSaving"
      [isSaving]="isSaving"
      (save)="onCreateUser($event)"
    ></app-user-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent {
  private readonly store = inject(Store);
  readonly isSaving$ = this.store.select(usersSelectors.selectIsCreatePending);

  onCreateUser(user: Omit<User, 'id'>): void {
    this.store.dispatch(createUserPageActions.userFormSubmitted({ user }));
  }
}
