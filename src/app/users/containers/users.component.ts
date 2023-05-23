import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {LetDirective} from '@ngrx/component';
import {UserListComponent} from '../components/user-list.component';
import {SearchBoxComponent} from '../../shared/search-box.component';
import {RouterLink, RouterModule} from "@angular/router";
import {createSelector, Store} from "@ngrx/store";
import {usersPageActions} from "../actions/users-page.actions";
import {usersFeature} from "../users.state";

@Component({
  standalone: true,
  imports: [NgFor, LetDirective, UserListComponent, SearchBoxComponent, NgIf, RouterLink],
  template: `
    <h1>Users</h1>

    <ng-container *ngrxLet="vm$ as vm">
      <app-search-box
        [query]="vm.query"
        (queryChanged)="onUpdateQuery($event)"
      ></app-search-box>

      <app-user-list [users]="vm.users"></app-user-list>

      <span *ngIf="vm.isLoading">Loading...</span>
      <p class="error" *ngIf="vm.error">{{ vm.error }}</p>

      <div>
        <button
          *ngFor="let pageSize of pageSizes"
          [class.active]="pageSize === vm.selectedPageSize"
          (click)="onUpdateSelectedPageSize(pageSize)"
        >
          {{ pageSize }}
        </button>
      </div>
    </ng-container>

    <div class="button-create-page">
      <button routerLink="create">
        Create New User
      </button>
    </div>
  `,
  providers: [RouterModule],
  styles: [
    `
      .active {
        background-color: aqua
      }

      .button-create-page {
        padding-top: 15px;

        button {
          background: green;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent implements OnInit {
  private readonly store = inject(Store);
  readonly pageSizes = [1, 3, 5, 10];

  readonly vm$ = this.store.select(selectUsersPageViewModel);

  ngOnInit(): void {
    this.store.dispatch(usersPageActions.opened());
  }

  onUpdateSelectedPageSize(selectedPageSize: number): void {
    this.store.dispatch(usersPageActions.pageSizeChanged({selectedPageSize}));
  }

  onUpdateQuery(query: string): void {
    this.store.dispatch(usersPageActions.queryChanged({query}));
  }
}

const selectUsersPageViewModel = createSelector({
  users: usersFeature.selectFilteredEntities,
  query: usersFeature.selectQuery,
  selectedPageSize: usersFeature.selectSelectedPageSize,
  isLoading: usersFeature.selectIsLoading,
  error: usersFeature.selectError
});
