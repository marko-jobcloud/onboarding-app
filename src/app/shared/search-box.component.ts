import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  template:
    '<input type="text" placeholder="Search..." [formControl]="queryControl" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  readonly queryControl = new FormControl('', { nonNullable: true });

  @Input() set query(query: string) {
    this.queryControl.setValue(query, { emitEvent: false });
  }

  @Output() queryChange = this.queryControl.valueChanges.pipe(
    map((query) => query.trim().toLowerCase()),
    distinctUntilChanged()
  );
}
