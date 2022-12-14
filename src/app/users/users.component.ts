import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from './users.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1>Users</h1>

    <input type="text" placeholder="Search..." [formControl]="queryControl" />

    <ul>
      <li *ngFor="let user of filteredUsers">
        {{ user.firstName + ' ' + user.lastName }}
      </li>
    </ul>

    <div>
      <button
        *ngFor="let pageSize of pageSizes"
        [class.active]="pageSize === selectedPageSize"
        (click)="onUpdateSelectedPageSize(pageSize)"
      >
        {{ pageSize }}
      </button>
    </div>
  `,
  styles: ['.active { background-color: aqua }'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private readonly usersService = inject(UsersService);

  readonly pageSizes = [1, 3, 5, 10];
  readonly queryControl = new FormControl('', { nonNullable: true });
  private querySubscription: Subscription | undefined;
  allUsers: User[] = [];
  filteredUsers: User[] = [];
  selectedPageSize = 5;

  ngOnInit(): void {
    this.usersService.getAll().subscribe((users) => {
      this.allUsers = users;
      this.filteredUsers = users.slice(0, this.selectedPageSize);
    });

    this.querySubscription = this.queryControl.valueChanges.subscribe(
      (query) => {
        query = query.trim().toLowerCase();
        this.filteredUsers = this.allUsers
          .filter(({ firstName }) => firstName.toLowerCase().includes(query))
          .slice(0, this.selectedPageSize);
      }
    );
  }

  onUpdateSelectedPageSize(pageSize: number): void {
    this.selectedPageSize = pageSize;
    this.filteredUsers = this.allUsers
      .filter(({ firstName }) =>
        firstName.toLowerCase().includes(this.queryControl.value)
      )
      .slice(0, this.selectedPageSize);
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
  }
}
