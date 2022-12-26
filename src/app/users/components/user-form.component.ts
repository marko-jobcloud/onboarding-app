import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm">
      <div>
        <label for="first-name">First Name:</label>
        <input type="text" id="first-name" formControlName="firstName" />
      </div>

      <div>
        <label for="last-name">Last Name:</label>
        <input type="text" id="last-name" formControlName="lastName" />
      </div>

      <button (click)="onSave()" [disabled]="!userForm.valid || isSaving">
        {{ isSaving ? 'Saving...' : 'Save' }}
      </button>
    </form>
  `,
})
export class UserFormComponent {
  readonly userForm = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  @Input() isSaving = false;

  @Input() set user(user: User | null | undefined) {
    if (user) {
      this.userForm.patchValue(user);
    } else {
      this.userForm.reset();
    }
  }

  @Output() save = new EventEmitter<Omit<User, 'id'>>();

  onSave(): void {
    this.save.emit(this.userForm.getRawValue());
  }
}
