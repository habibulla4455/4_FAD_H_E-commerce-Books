import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  bookList: Observable<any[]>;

  constructor(private http: HttpClient, private angularFireDB: AngularFireDatabase) {

  }

  getBooks() {
    this.bookList = this.angularFireDB.list('books').snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({key: a.key, ...a.payload.val()}))
        )
      );
  }

}
