import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  OperatorFunction,
  pipe,
} from 'rxjs';

export class BaseStore<T> {
  private readonly stateSubject: BehaviorSubject<T>;
  readonly state$: Observable<T>;

  constructor(initialState: T) {
    this.stateSubject = new BehaviorSubject(initialState);
    this.state$ = this.stateSubject.asObservable();
  }

  patchState(partialState: Partial<T>): void {
    this.stateSubject.next({ ...this.stateSubject.value, ...partialState });
  }
}

export function select<Input, Result>(
  selector: (input: Input) => Result
): OperatorFunction<Input, Result> {
  return pipe(map(selector), distinctUntilChanged());
}
