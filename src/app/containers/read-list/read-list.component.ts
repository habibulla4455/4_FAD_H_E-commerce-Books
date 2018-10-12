import {Component, OnInit} from '@angular/core';
import {UserReadListsService} from '../../services/user-read-lists.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {ReadingListPos} from '../../model/readingListPos';
import {Router} from '@angular/router';

@Component({
  selector: 'app-read-list',
  templateUrl: './read-list.component.html',
  styleUrls: ['./read-list.component.css']
})
export class ReadListComponent implements OnInit {

  readList: Array<ReadingListPos>;
  alreadyReadList: Array<ReadingListPos>;
  userListSubscription;

  constructor(
    private userReadListService: UserReadListsService,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userListSubscription = this.userReadListService.userReadList.subscribe(list => {
          this.readList = list.filter(element => !element.read);
          this.alreadyReadList = list.filter(element => element.read);
        });
      } else {
        if (this.userListSubscription) {
          this.userListSubscription.unsubscribe();
        }
      }
    });
  }

  navigateToBook(bookId) {
    this.router.navigate(['books/' + bookId]);
  }

  removeFromList(key, event) {
    event.stopPropagation();
    this.userReadListService.removeFromReadList(key);
  }

  markAsRead(position, event) {
    event.stopPropagation();
    const modifiedPosition = {...position, read: true};
    this.userReadListService.modifyListPosition(modifiedPosition);
  }

  markAsToRead(position, event) {
    event.stopPropagation();
    const modifiedPosition = {...position, read: false};
    this.userReadListService.modifyListPosition(modifiedPosition);
  }
}
