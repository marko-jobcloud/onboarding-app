import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-search-box',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <input type="text" placeholder="Search..." [formControl]="search">
    `
})
export class SearchBoxComponent implements OnInit {

    readonly search = new FormControl('', { nonNullable: true });

    @Output() searchEvent = new EventEmitter<string>();

    ngOnInit(): void {
        this.search.valueChanges.subscribe(() => 
            this.searchChange()
        )
    }

    searchChange(): void {
        const query = this.search.value.trim().toLowerCase();
        this.searchEvent.emit(query)
    }
}