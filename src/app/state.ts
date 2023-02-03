import { getActionTypeFromInstance, StateContext } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface StateModel {
  action: {
    type: string;
    value: any;
  };
  busy: boolean;
  error: Error;
}

export class BaseStateModel implements StateModel {
  action = undefined;
  busy = false;
  error = undefined;
}

export function observeAction<T>(ctx: StateContext<any>, action: any, observable: Observable<T>) {

  const set = (value: Partial<StateModel>) => ctx.setState({ ...ctx.getState(), ...value });

  set({
    action: {
      type: getActionTypeFromInstance(action),
      value: action
    },
    busy: true
  });

  return observable.pipe(
    tap(() => set({ error: undefined, busy: false })),
    catchError(error => { set({ error, busy: false }); return of(); })
  );

}
