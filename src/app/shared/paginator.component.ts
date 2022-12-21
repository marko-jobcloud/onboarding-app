import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-paginator',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div>
            <button
                *ngFor="let pageSize of pageSizes"
                [class.active]="pageSize === selectedPageSize"
                (click)="onPageSizeChange(pageSize)"
            >
                {{ pageSize }}
            </button>
        </div>
    `,
    styles: ['.active { background-color: pink; }']
})
export class PaginatorComponent {

    readonly pageSizes = [1, 3, 5, 10]

    @Input() selectedPageSize!: number | null;
    @Output() pageSizeChange = new EventEmitter<number>();

    onPageSizeChange(page: number): void {
        this.pageSizeChange.emit(page)
    }
}