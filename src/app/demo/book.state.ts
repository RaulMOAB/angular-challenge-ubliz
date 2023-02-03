import { Action, State, StateContext, Store } from "@ngxs/store";
import produce from "immer";
import { BaseStateModel, observeAction } from "../state";
import { of } from "rxjs";
import { delay, find, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { DemoService } from "./demo.service";
import { Book } from "../core/models/book.model";
import { BookService } from "./book.service";
import { StateContextFactory } from "@ngxs/store/src/internal/state-context-factory";

export class BookStateModel extends BaseStateModel {
  bookList = [];//dato a mostrar en la vista
}

export const ACTION_PREFIX = "[Book]";

//params to export every time a function need params
export type BookActionParams = { bookList:[]; fail?: boolean };


//Creating an action
export class Find{
  public static readonly type = `${ACTION_PREFIX} Find`;
  constructor(){}
  static dispatch = (store: Store) => store.dispatch(new Find());// when this class is called action find is dispatched
}

export class Remove{
  public static readonly type = `${ACTION_PREFIX} Remove`;
  constructor(public params: BookActionParams){}
  static dispatch = (store: Store, params: BookActionParams) =>
    store.dispatch(new Remove(params));
}

//this is the Select on component logic
//?
@Injectable()
@State<BookStateModel>({
  name: "book",
  defaults: new BookStateModel(),
})
export class BookState {
  constructor(private bookService: BookService) {}
  
  //Action set a bookList to state
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
        tap((bookList) =>
         ctx.setState(
          produce((bookStateModel: BookStateModel) => {    
            console.log(bookStateModel.bookList.length);                    
            bookStateModel.bookList.splice(-1,1);
            console.log(bookStateModel.bookList.length);
          })
         ))
      )    
    )
  }

  //?
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









