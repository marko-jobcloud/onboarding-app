import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      *ngFor="let pageSize of pageSizes"
      [class.active]="pageSize === selectedPageSize"
      (click)="selectedPageSizeChange.emit(pageSize)"
    >
      {{ pageSize }}
    </button>
  `,
  styles: ['.active { background-color: aqua; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  readonly pageSizes = [1, 3, 5, 10];

  @Input() selectedPageSize = 5;
  @Output() selectedPageSizeChange = new EventEmitter<number>();
}
