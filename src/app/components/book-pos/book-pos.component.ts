import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {Router} from '@angular/router';
import {ReadingListPos} from '../../model/readingListPos';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserReadListsService} from '../../services/user-read-lists.service';

@Component({
  selector: 'app-book-pos',
  templateUrl: './book-pos.component.html',
  styleUrls: ['./book-pos.component.css']
})
export class BookPosComponent implements OnInit {

  @Input() booksList: Array<Book>;

  userListSubscription;
  userReadingList: Array<ReadingListPos>;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private userReadListService: UserReadListsService,
  ) {
  }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userListSubscription = this.userReadListService.userReadList.subscribe(list => {
          this.userReadingList = list;
        });
      } else {
        if (this.userListSubscription) {
          this.userListSubscription.unsubscribe();
          this.userReadingList = [];
        }
      }
    });
  }

  checkIfOnTheList(bookId) {
    let check = false;
    if(this.userReadingList) {
      this.userReadingList.forEach(element => {
        if (element.bookId === bookId) {
          check = true;
        }
      });
    }
    return check;
  }

  redirect(bookId) {
    this.router.navigate(['books/' + bookId]);
  }
}
