import {Injectable} from '@angular/core';
import {Book} from '../model/book';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditBookService {

  bookIsEdited = new BehaviorSubject<boolean>(false);
  bookEdited = new BehaviorSubject<any>({});

  constructor() {
  }

  bookEditedSet(book: Book) {
    this.bookIsEdited.next(true);
    this.bookEdited.next(book);
  }

  bookEditedReset() {
    this.bookIsEdited.next(false);
    this.bookEdited.next({});
  }
}
