import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Book} from '../model/book';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  bookList: Observable<any[]>;
  book: Observable<any[]>;

  constructor(private http: HttpClient, private angularFireDB: AngularFireDatabase, private route: Router) {
    this.getBooks();
  }

  getBooks() {
    this.bookList = this.angularFireDB.list('books').snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({key: a.key, ...a.payload.val()}))
        )
      );
  }

  getBookById(id: string) {
    this.book = this.angularFireDB.list('books/' + id).snapshotChanges()
      .pipe(
        map(actions => {
            const table = actions.map(a => {
              return ({
                [a.key]: a.payload.val()
              });
            });
            const object = {};
            for (const element of table) {
              for (let key in element) {
                object[key] = element[key];
              }
            }
            return [object];
          }
        )
      );
  }

  createNewBook(book) {
    this.angularFireDB.list('books').push(book).then(succes => {
      this.route.navigate(['books/' + succes.path.pieces_[1]]);
    });
  }

  deleteBook(bookId) {
    this.angularFireDB.list('books').remove(bookId)
      .then(() => {
          this.route.navigate(['books']);
        }
      ).catch(err => {
      alert(err);
    });
  }

  editBook(id, book) {
    this.angularFireDB.list('books').set(id, book)
      .then(() => {
          this.route.navigate(['books/' + id]);
        }
      ).catch(err => {
      alert(err);
    });
  }
}
