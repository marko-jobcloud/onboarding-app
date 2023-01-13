import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { PaginatorComponent } from '../../shared/elements/paginator.component';
import { SearchBoxComponent } from '../../shared/elements/search-box.component';
import { UserListComponent } from '../components/user-list.component';
import { usersPageActions } from '../actions/users-page.actions';
import { usersSelectors } from '../state';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LetModule,
    PaginatorComponent,
    SearchBoxComponent,
    UserListComponent,
  ],
  template: `
    <section class="users-page-header">
      <h1>Users</h1>
      <a routerLink="create">+ Create New User</a>
    </section>

    <ng-container *ngrxLet="vm$ as vm">
      <app-search-box
        [query]="vm.query"
        (queryChange)="onUpdateQuery($event)"
      ></app-search-box>
      <span *ngIf="vm.isLoading">Loading...</span>
      <p class="error" *ngIf="vm.error">{{ vm.error }}</p>

      <app-user-list [users]="vm.users"></app-user-list>

      <app-paginator
        [selectedPageSize]="vm.selectedPageSize"
        (selectedPageSizeChange)="onUpdateSelectedPageSize($event)"
      ></app-paginator>
    </ng-container>
  `,
  styles: [
    `
      .users-page-header {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        align-items: center;
      }

      .error {
        color: red;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  private readonly store = inject(Store);

  readonly vm$ = this.store.select(selectUsersPageViewModel);

  ngOnInit(): void {
    this.store.dispatch(usersPageActions.opened());
  }

  onUpdateSelectedPageSize(selectedPageSize: number): void {
    this.store.dispatch(usersPageActions.pageSizeChanged({ selectedPageSize }));
  }

  onUpdateQuery(query: string): void {
    this.store.dispatch(usersPageActions.queryChanged({ query }));
  }
}

const selectUsersPageViewModel = createSelector({
  users: usersSelectors.selectFilteredEntities,
  query: usersSelectors.selectQuery,
  selectedPageSize: usersSelectors.selectSelectedPageSize,
  isLoading: usersSelectors.selectIsLoadPending,
  error: usersSelectors.selectLoadError,
});
