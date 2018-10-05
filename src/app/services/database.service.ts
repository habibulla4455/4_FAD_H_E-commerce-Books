import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  items: Observable<any[]>;

  constructor(private http: HttpClient, private angularFireDB: AngularFireDatabase) {

  }

  getBooks() {
    this.items = this.angularFireDB.list('books').valueChanges();
    this.items.subscribe( changes => {
      console.log(changes);
    });
  }

}
