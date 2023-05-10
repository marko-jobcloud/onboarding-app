import { BehaviorSubject, Observable } from 'rxjs';

export class BaseStore<T> {
  private readonly stateSubject: BehaviorSubject<T>;
  readonly state$: Observable<T>;

  constructor(initialState: T) {
    this.stateSubject = new BehaviorSubject(initialState);
    this.state$ = this.stateSubject.asObservable();
  }

  setState(state: T): void {
    this.stateSubject.next(state);
  }

  patchState(partialState: Partial<T>): void {
    this.stateSubject.next({ ...this.stateSubject.value, ...partialState });
  }
}
