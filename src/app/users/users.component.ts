import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from './users.store';
import { PaginatorComponent } from '../shared/paginator.component';
import { SearchBoxComponent } from '../shared/search-box.component';
import { UserListComponent } from './components/user-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorComponent,
    SearchBoxComponent,
    UserListComponent,
  ],
  template: `
    <h1>Users</h1>

    <app-search-box
      [query]="(query$ | async)!"
      (queryChange)="onUpdateQuery($event)"
    ></app-search-box>

    <app-user-list [users]="(filteredUsers$ | async)!"></app-user-list>

    <app-paginator
      [selectedPageSize]="(selectedPageSize$ | async)!"
      (selectedPageSizeChange)="onUpdateSelectedPageSize($event)"
    ></app-paginator>
  `,
  providers: [UsersStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly usersStore = inject(UsersStore);

  readonly query$ = this.usersStore.query$;
  readonly selectedPageSize$ = this.usersStore.selectedPageSize$;
  readonly filteredUsers$ = this.usersStore.filteredUsers$;

  onUpdateSelectedPageSize(selectedPageSize: number): void {
    this.usersStore.patchState({ selectedPageSize });
  }

  onUpdateQuery(query: string): void {
    this.usersStore.patchState({ query });
  }
}
