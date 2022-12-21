import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from './users.store';
import { PaginatorComponent } from '../shared/paginator.component';
import { SearchBoxComponent } from '../shared/search-box.component';
import { UserListComponent } from './components/user-list.component';
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorComponent,
    SearchBoxComponent,
    UserListComponent,
    LetModule,
  ],
  template: `
    <h1>Users</h1>

    <ng-container *ngrxLet="vm$ as vm">
      <app-search-box
        [query]="vm.query"
        (queryChange)="onUpdateQuery($event)"
      ></app-search-box>

      <app-user-list [users]="vm.filteredUsers"></app-user-list>

      <app-paginator
        [selectedPageSize]="vm.selectedPageSize"
        (selectedPageSizeChange)="onUpdateSelectedPageSize($event)"
      ></app-paginator>
    </ng-container>
  `,
  providers: [UsersStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly usersStore = inject(UsersStore);

  readonly vm$ = this.usersStore.vm$;

  onUpdateSelectedPageSize(selectedPageSize: number): void {
    this.usersStore.patchState({ selectedPageSize });
  }

  onUpdateQuery(query: string): void {
    this.usersStore.patchState({ query });
  }
}
