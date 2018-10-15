import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatabaseService} from '../../services/database.service';
import {Book} from '../../model/book';
import {AuthService} from '../../services/auth.service';
import {EditBookService} from '../../services/edit-book.service';
import {UserReadListsService} from '../../services/user-read-lists.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  id: string;
  private sub: any;
  book: Book;
  deleteBookPopup = false;
  bookOnReadList = false;
  onReadListId = '';
  userListSubscription;
  addRemoveBttnText = 'Add to read list';

  constructor(
    public authservice: AuthService,
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private editBookService: EditBookService,
    private router: Router,
    private userReadListService: UserReadListsService,
    private angularFireAuth: AngularFireAuth,
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.dbService.getBookById(this.id);
    });
    this.dbService.book.subscribe(book => {
      this.book = book[0];
    });
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userListSubscription = this.userReadListService.userReadList.subscribe(list => {
          list.forEach(element => {
            if (element.bookId === this.id) {
              this.bookOnReadList = true;
              this.onReadListId = element.key;
              this.addRemoveBttnText = 'Remove from the list';
            }
          });
        });
      } else {
        if (this.userListSubscription) {
          this.userListSubscription.unsubscribe();
        }
      }
    });
  }

  addToRead() {
    if (this.bookOnReadList) {
      this.userReadListService.removeFromReadList(this.onReadListId);
      this.onReadListId = '';
      this.bookOnReadList = false;
      this.addRemoveBttnText = 'Add to read list';

    } else {
      this.userReadListService.addToReadList(this.book.name, this.book.author, this.id);
      this.addRemoveBttnText = 'Remove from the list';
    }
  }

  deleteBook() {
    this.dbService.deleteBook(this.id);
  }

  editbook() {
    this.editBookService.bookEditedSet({key: this.id, ...this.book});
    this.router.navigate(['addbook']);
  }

  getAddToListStyle() {
    if (this.bookOnReadList) {
      return 'crimson';
    }
  }
}
