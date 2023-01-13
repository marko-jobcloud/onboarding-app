import { createSelector, MemoizedSelector } from '@ngrx/store';

export type CallState = 'init' | 'pending' | 'fulfilled' | { error: string };

export interface CallStateSelectors {
  selectIsPending: MemoizedSelector<Record<string, any>, boolean>;
  selectIsFulfilled: MemoizedSelector<Record<string, any>, boolean>;
  selectError: MemoizedSelector<Record<string, any>, string | null>;
}

export function getCallStateSelectors(
  selectCallState: MemoizedSelector<Record<string, any>, CallState>
): CallStateSelectors {
  return {
    selectIsPending: createSelector(
      selectCallState,
      (callState) => callState === 'pending'
    ),
    selectIsFulfilled: createSelector(
      selectCallState,
      (callState) => callState === 'fulfilled'
    ),
    selectError: createSelector(selectCallState, (callState) =>
      isError(callState) ? callState.error : null
    ),
  };
}

function isError(callState: CallState): callState is { error: string } {
  return typeof callState === 'object';
}
