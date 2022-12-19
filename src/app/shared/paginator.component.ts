import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-paginator',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div>
            <button
                *ngFor="let pageSize of pageSizes"
                [class.active]="pageSize === currentPage"
                (click)="pageChange(pageSize)"
            >
                {{ pageSize }}
            </button>
        </div>
    `,
    styles: ['.active { background-color: pink; }']
})
export class PaginatorComponent implements OnInit {

    readonly pageSizes = [1, 3, 5, 10]

    @Input() currentPage: any;
    @Output() pageChangeEvent = new EventEmitter<number>();

    ngOnInit(): void {
    }

    pageChange(page: number): void {
        this.currentPage = page;
        this.pageChangeEvent.emit(this.currentPage)
    }
}