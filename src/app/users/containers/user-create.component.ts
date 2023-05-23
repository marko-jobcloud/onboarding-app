import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserFormComponent} from "../components/user-form.component";
import {Store} from "@ngrx/store";
import {User} from "../user.model";
import {userCreatePageActions} from "../actions/user-create-page.actions";
import {LetDirective} from "@ngrx/component";
import {usersFeature} from "../users.state";

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, UserFormComponent, LetDirective],
  template: `
      <h1>Create User</h1>
      <app-user-form
              *ngrxLet="isPending$ as isPending"
              [isSaving]="isPending"
              (save)="onUserCreate($event)">
      </app-user-form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserCreateComponent {
  private readonly store = inject(Store);
  readonly isPending$ = this.store.select(usersFeature.selectIsPending);

  onUserCreate(user: Omit<User, 'id'>) {
    this.store.dispatch(userCreatePageActions.formSubmitted({user}));
  }
}
