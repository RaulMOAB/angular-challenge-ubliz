import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { BookState, BookStateModel, Remove } from '../book.state';
import { Find } from '../book.state';


@Component({
  selector: 'ng-challenge-com2',
  templateUrl: './com2.component.html',
  styleUrls: ['./com2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Com2Component implements OnInit, OnDestroy {

  fail = false;
  errorMessage;
  errorDetail;

  @Select(BookState) state$: Observable<BookStateModel>;
  _state: Subscription;

  constructor(
    private store: Store //?
  ) { }

  ngOnInit() {
    this._state = this.state$.subscribe(state => {
      if (state.error && state.error !== this.errorDetail) {
        this.errorDetail = state.error;
        this.errorMessage = [{
          severity: 'error',
          summary: 'Error',
          detail: this.errorDetail
        }]
      }
    });
    Find.dispatch(this.store);
  }

  ngOnDestroy(){
    this._state.unsubscribe();
  }

  onRemove(book){
    Remove.dispatch(this.store, {bookList:book})
  }
}


