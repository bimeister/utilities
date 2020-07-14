import type { Observable } from 'rxjs';
import type { StateOperator } from './state-operator.type';

export interface StateContext<T> {
  /**
   * Get the current state.
   */
  getState(): T;
  /**
   * Reset the state to a new value.
   */
  setState(val: T | StateOperator<T>): T;
  /**
   * Patch the existing state with the provided value.
   */
  patchState(val: Partial<T>): T;
  /**
   * Dispatch a new action and return the dispatched observable.
   */
  dispatch(actions: any | any[]): Observable<void>;
}
