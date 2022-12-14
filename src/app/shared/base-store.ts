import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  OperatorFunction,
  pipe,
} from 'rxjs';

export abstract class BaseStore<T> {
  protected readonly state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this.state$ = new BehaviorSubject(initialState);
  }

  setState(state: T): void {
    this.state$.next(state);
  }

  patchState(partialState: Partial<T>): void {
    this.setState({ ...this.state$.value, ...partialState });
  }
}

export function select<State, Result>(
  projector: (state: State) => Result
): OperatorFunction<State, Result> {
  return pipe(map(projector), distinctUntilChanged());
}
