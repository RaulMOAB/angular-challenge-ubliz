import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Add, DemoState, DemoStateModel, Find, Substract } from '../demo.state';

@Component({
  selector: 'app-com1',
  templateUrl: './com1.component.html',
  styleUrls: ['./com1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Com1Component implements OnInit, OnDestroy {

  fail = false;
  errorMessage;
  errorDetail;

  @Select(DemoState) state$: Observable<DemoStateModel>;
  _state: Subscription;

  constructor(
    private store: Store
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

  ngOnDestroy() {
    this._state.unsubscribe();
  }

  onAdd() {
    Add.dispatch(this.store, { amount: 1, fail: this.fail })
  }

  onSubstract() {
    Substract.dispatch(this.store, { amount: 1, fail: this.fail });
  }

}
