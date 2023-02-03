import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../core/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
//Call to a DB or Api
  findBooks(): Observable<Book[]>{//returns and observable list of books, type Book[]
    return of([
      {
        code: "123123123",
        name: "Book1",
      },
      {
        code: "123456789",
        name: "Book2",
      },
      {
        code: "789456123",
        name: "Book3",
      },
      {
        code: "456123789",
        name: "Book4",
      },
    ])
  }
}
