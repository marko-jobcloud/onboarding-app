import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { UserListComponent } from './components/user-list.component';
import { SearchBoxComponent } from '../shared/search-box.component';
import { UsersStore } from './users.store';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, LetDirective, UserListComponent, SearchBoxComponent, NgIf],
  template: `
    <h1>Users</h1>

    <ng-container *ngrxLet="vm$ as vm">
      <app-search-box
        [query]="vm.query"
        (queryChanged)="onQueryChanged($event)"
      ></app-search-box>

      <app-user-list [users]="vm.users"></app-user-list>

      <p *ngIf="vm.isLoading">Loading...</p>

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
  `,
  styles: ['.active { background-color: aqua }'],
  providers: [UsersStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly usersStore = inject(UsersStore);

  readonly pageSizes = [1, 3, 5, 10];

  readonly vm$ = this.usersStore.vm$;

  onUpdateSelectedPageSize(selectedPageSize: number): void {
    this.usersStore.patchState({ selectedPageSize });
  }

  onQueryChanged(query: string): void {
    this.usersStore.patchState({ query });
  }
}
