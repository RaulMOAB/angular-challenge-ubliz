import { Action, State, StateContext, Store } from "@ngxs/store";
import produce from "immer";
import { BaseStateModel, observeAction } from "../state";
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BookService } from "./book.service";


export class BookStateModel extends BaseStateModel {
  bookList = [];
}

export const ACTION_PREFIX = "[Book]";

export type BookActionParams = { bookList:[]; fail?: boolean };


export class Find{
  public static readonly type = `${ACTION_PREFIX} Find`;
  constructor(){}
  static dispatch = (store: Store) => store.dispatch(new Find());
}

export class Remove{
  public static readonly type = `${ACTION_PREFIX} Remove`;
  constructor(public params: BookActionParams){}
  static dispatch = (store: Store, params: BookActionParams) =>
    store.dispatch(new Remove(params));
}


@Injectable()
@State<BookStateModel>({
  name: "book",
  defaults: new BookStateModel(),
})
export class BookState {
  constructor(private bookService: BookService) {}
  

  @Action(Find)
  find(ctx: StateContext<BookStateModel>, action: Find){
    return observeAction(
      ctx,
      action,
      this.bookService.findBooks().pipe(
        tap(bookList => {
          ctx.setState(
            produce((bookStateModel: BookStateModel) => {
              bookStateModel.bookList = bookList;
            })
          )
        })
      )
    )
  }

  @Action(Remove)
  remove(ctx: StateContext<BookStateModel>, action: Remove){
    return observeAction(
      ctx,
      action,
      this.value(action.params).pipe(
        tap(() =>
         ctx.setState(
          produce((bookStateModel: BookStateModel) => {                   
            bookStateModel.bookList.splice(-1,1);
          })
         ))
      )    
    )
  }

  value(params: BookActionParams){
    return of(params.bookList).pipe(
      tap(() => {
        if (params.fail) {
          throw new Error("Fail");
        }
      })
    );
  }
}









