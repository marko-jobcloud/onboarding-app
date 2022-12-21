import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../user.model";

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ul>
            <li *ngFor="let user of users">
                {{ user.firstName + ' ' + user.lastName }}
            </li>
        </ul>
    `,
})
export class UserListComponent {

    @Input() users: User[] | null = [];

}