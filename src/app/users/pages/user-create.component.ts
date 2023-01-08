import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectIsCreating } from "../state/users.selectors";
import { User } from "../user.model";
import { UserFormComponent } from "../components/user-form.component";
import { UserCreateActions } from "../actions/user-create.actions";
import { LetModule } from "@ngrx/component";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-user-create',
    standalone: true,
    imports: [
        LetModule,
        UserFormComponent,
        RouterModule
    ],
    template: `
        <h2>Create User:</h2>
        <ng-container *ngrxLet="isCreating$ as isCreating">
            <app-user-form
                [isSaving]="isCreating"
                (save)="onCreateUser($event)"
            ></app-user-form>
        </ng-container> 
        <a routerLink="/">Home</a><br>
    `
})
export class UserCreateComponent {
    private readonly store = inject(Store);
    readonly isCreating$ = this.store.select(selectIsCreating);

    onCreateUser(user: Omit<User, 'id'>): void {
        this.store.dispatch(UserCreateActions.createUser({user}));
    }
}