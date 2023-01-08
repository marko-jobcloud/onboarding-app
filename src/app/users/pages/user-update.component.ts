import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LetModule } from "@ngrx/component";
import { createSelector, Store } from "@ngrx/store";
import { UserUpdateActions } from "../actions/user-update.actions";
import { UserFormComponent } from "../components/user-form.component";
import { selectIsUpdating, selectSelectedUser } from "../state/users.selectors";
import { User } from "../user.model";

@Component({
    selector: 'app-user-update',
    standalone: true,
    imports: [
        LetModule,
        RouterModule,
        UserFormComponent
    ],
    template: `
        <h2>Update User:</h2>
        <ng-container *ngrxLet="vm$ as vm">
        {{ vm.selectedUser }}
            <app-user-form
                [user]="vm.selectedUser"
                [isSaving]="vm.isUpdating"
                (save)="onUpdateUser($event)"
            ></app-user-form>
        </ng-container>
        <a routerLink="/users">Users</a><br>
    `
})
export class UserUpdateComponent {
    private readonly store = inject(Store);
    
    readonly vm$ = this.store.select(selectUsersPageViewModel);

    onUpdateUser(user: Omit<User, 'id'>): void {
        this.store.dispatch(UserUpdateActions.updateUser({user}));
    }   
}

const selectUsersPageViewModel = createSelector({
    selectedUser: selectSelectedUser,
    isUpdating: selectIsUpdating,
  });