import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserFormComponent } from '../users/components/user-form.component';
import { selectIsCreating } from '../users/state/users.selectors';
import { User } from '../users/user.model';
import { LetModule } from '@ngrx/component';
import { createUserActions } from '../users/actions/create-users-page.action';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'create-user',
  standalone: true,
  imports: [UserFormComponent, LetModule, RouterLink],
  template: `
    <ng-container *ngrxLet="isSaving$ as saving">
      <button routerLink="/users" [disabled]="saving">Back</button>
      <h2>Create User:</h2>
      <app-user-form
        [isSaving]="saving"
        (save)="onCreateUser($event)"
      ></app-user-form>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent {
  private readonly store = inject(Store);

  readonly isSaving$ = this.store.select(selectIsCreating);

  onCreateUser(user: Omit<User, 'id'>): void {
    this.store.dispatch(createUserActions.saveUser({ user }));
  }
}
