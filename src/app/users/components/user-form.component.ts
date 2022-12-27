import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from "@angular/forms";
import { User } from "../user.model";

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <form [formGroup]="form">
            <input type="text" placeholder="First Name" formControlName="firstName"/><br/>
            <input type="text" placeholder="Last Name" formControlName="lastName"/><br/>
            <button (click)="onSave()" [disabled]="isDisabled">Save</button>
        </form>
    `,
    styles: ['form { margin: 20px 0 }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
    private readonly formBuilder = inject(NonNullableFormBuilder)

    readonly form = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]]
    })

    @Input() set user(user: Omit<User, 'id'> | null) {
        if (user) {
            this.form.setValue(user)
        } else {
            this.form.reset()
        }
    }
    @Input() isDisabled = false;

    @Output() save = new EventEmitter<Omit<User, 'id'>>();

    onSave() {
        this.save.emit(this.form.getRawValue());
    }
}