import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../user.model";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
      <form [formGroup]="formGroup">
          <div>
              <label>First name:</label>
              <input type="text" formControlName="firstName">
          </div>

          <div>
              <label>Last name:</label>
              <input type="text" formControlName="lastName">
          </div>

          <button (click)="onSaveUser()" [disabled]="!formGroup.valid || isSaving">
              {{isSaving ? 'User saving...'  : 'Save'}}
          </button>
      </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
  readonly formGroup = new FormGroup({
    firstName: new FormControl('', {nonNullable: true, validators: Validators.required}),
    lastName: new FormControl('', {nonNullable: true, validators: Validators.required})
  })

  @Input() set user(user: User | null) {
    if (user) {
      this.formGroup.patchValue(user);
    } else {
      this.formGroup.reset();
    }
  }

  @Input() isSaving = false;

  @Output() save = new EventEmitter<Omit<User, 'id'>>();

  onSaveUser(): void {
    this.save.emit(this.formGroup.getRawValue());
  }

}
