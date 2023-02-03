import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Add, Substract, DemoState, DemoStateModel, DemoActionParams } from './demo.state';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  findCom1(): Observable<number> {
    // GraphQL Call...
    return of(5);
  }


}
