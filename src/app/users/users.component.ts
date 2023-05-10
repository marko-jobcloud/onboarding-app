import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { UsersService } from './users.service';
import { User } from './user.model';
import { LetModule } from '@ngrx/component';
import { UserListComponent } from './components/user-list.component';
import { SearchBoxComponent } from '../shared/search-box.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    LetModule,
    UserListComponent,
    SearchBoxComponent,
  ],
  template: `
    <h1>Users</h1>

    <ng-container
      *ngrxLet="{
        filteredUsers: filteredUsers$,
        selectedPageSize: selectedPageSize$,
        query: query$
      } as vm"
    >
      <app-search-box
        [query]="vm.query"
        (queryChanged)="onQueryChanged($event)"
      ></app-search-box>

      <app-user-list [users]="vm.filteredUsers"></app-user-list>

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  private readonly usersService = inject(UsersService);

  readonly pageSizes = [1, 3, 5, 10];

  readonly users$ = new BehaviorSubject<User[]>([]);
  readonly selectedPageSize$ = new BehaviorSubject<number>(5);
  readonly query$ = new BehaviorSubject<string>('');

  readonly filteredUsers$ = combineLatest({
    users: this.users$,
    query: this.query$,
    selectedPageSize: this.selectedPageSize$,
  }).pipe(
    map(({ users, query, selectedPageSize }) =>
      users
        .filter(({ firstName }) => firstName.toLowerCase().includes(query))
        .slice(0, selectedPageSize)
    )
  );

  ngOnInit(): void {
    this.usersService.getAll().subscribe((users) => this.users$.next(users));
  }

  onUpdateSelectedPageSize(pageSize: number): void {
    this.selectedPageSize$.next(pageSize);
  }

  onQueryChanged(query: string): void {
    this.query$.next(query);
  }
}
