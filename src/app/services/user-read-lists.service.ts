import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {ReadingListPos} from '../model/readingListPos';

@Injectable({
  providedIn: 'root'
})
export class UserReadListsService {

  userReadList: Observable<any[]>;

  constructor(private authService: AuthService,
              private angularFireDB: AngularFireDatabase,
              private angularFireAuth: AngularFireAuth,
  ) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.fetchUserReadList();
      }
    });
  }

  fetchUserReadList() {
    this.userReadList = this.angularFireDB.list('userLists/' + this.authService.user.uid)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({key: a.key, ...a.payload.val()}))
        )
      );
  }

  addToReadList(title, author, bookId) {
    const newPosition = {
      title,
      author,
      bookId: bookId,
      read: false
    };
    this.angularFireDB.list('userLists/' + this.authService.user.uid).push(newPosition)
      .then(success => {
      });
  }

  removeFromReadList(bookId) {
    this.angularFireDB.list('userLists/' + this.authService.user.uid).remove(bookId)
      .then(() => {
        }
      ).catch(err => {
      alert(err);
    });
  }

  modifyListPosition(position: ReadingListPos) {
    const modifiedPosition = {
      author: position.author,
      bookId: position.bookId,
      read: position.read,
      title: position.title
    };

    this.angularFireDB.list('userLists/' + this.authService.user.uid).set(position.key, modifiedPosition)
      .then(() => {
        }
      ).catch(err => {
      alert(err);
    });
  }
}
