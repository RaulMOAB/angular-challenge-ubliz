import { Action, State, StateContext, Store } from "@ngxs/store";
import produce from "immer";
import { BaseStateModel, observeAction } from "../state";
import { of } from "rxjs";
import { count, delay, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { DemoService } from "./demo.service";

export class  DemoStateModel extends BaseStateModel {
  count = 0;
}

export const ACTION_PREFIX = "[Demo]";

export type DemoActionParams = { amount: number; fail?: boolean };

export class Find {
  public static readonly type = `${ACTION_PREFIX} Find`;
  constructor() {}
  static dispatch = (store: Store) => store.dispatch(new Find());
}

export class Add {
  public static readonly type = `${ACTION_PREFIX} Add`;
  constructor(public params: DemoActionParams) {}
  static dispatch = (store: Store, params: DemoActionParams) =>
    store.dispatch(new Add(params));
}

export class Substract {
  public static readonly type = `${ACTION_PREFIX} Substract`;
  constructor(public params: DemoActionParams) {}
  static dispatch = (store: Store, params: DemoActionParams) =>
    store.dispatch(new Substract(params));
}

@Injectable()
@State<DemoStateModel>({
  name: "demo",
  defaults: new DemoStateModel(),
})
export class DemoState {
  constructor(private demoService: DemoService) {}

  @Action(Find)
  find(ctx: StateContext<DemoStateModel>, action: Find) {
    return observeAction(
      ctx,
      action,
      this.demoService.findCom1().pipe(
        tap(v => {
          ctx.setState(
            produce((d: DemoStateModel) => {
              d.count = v;
            })
          )
        })
      )
    );
  }

  @Action(Add)
  add(ctx: StateContext<DemoStateModel>, action: Add) {
    return observeAction(
      ctx,
      action,
      this.value(action.params).pipe(
        tap((v) =>
          ctx.setState(
            produce((d: DemoStateModel) => {
              d.count += v;
            })
          )
        )
      )
    );
  }

  @Action(Substract)
  substract(ctx: StateContext<DemoStateModel>, action: Substract) {
    return observeAction(
      ctx,
      action,
      this.value(action.params).pipe(
        tap((v) =>
          ctx.setState(
            produce((d: DemoStateModel) => {
              d.count -= v;
            })
          )
        )
      )
    );
  }

  value(params: DemoActionParams) {
    return of(params.amount).pipe(
      delay(500),
      tap(() => {
        if (params.fail) {
          throw new Error("Fail");
        }
      })
    );
  }
}
