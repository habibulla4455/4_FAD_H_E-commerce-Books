import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Book} from '../../model/book';
import {Router} from '@angular/router';
import {ReadingListPos} from '../../model/readingListPos';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserReadListsService} from '../../services/user-read-lists.service';

@Component({
  selector: 'app-book-cat-container',
  templateUrl: './book-cat-container.component.html',
  styleUrls: ['./book-cat-container.component.css']
})
export class BookCatContainerComponent implements OnInit, OnChanges {

  @Input() books: Array<Book>;
  @Input() categoryName: string;
  @Input() linkTo: string;

  bookListWidth = 0;
  bookListPos = 0;
  leftBttnVisible = 0;
  rightBttonVisible = 0;
  userListSubscription;
  userReadingList: Array<ReadingListPos>;

  @ViewChild('listContainer') listContainer: ElementRef;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private userReadListService: UserReadListsService,
  ) {
  }

  ngOnInit() {
    if (this.bookListPos + this.bookListWidth > this.listContainer.nativeElement.clientWidth) {
      this.rightBttonVisible = 1;
    }
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

  ngOnChanges(changes) {
    this.bookListWidth = changes.books.currentValue.length * 160;
  }

  goRight() {
    if (this.bookListPos < 0) {
      this.bookListPos += 160;
      if (this.bookListPos + this.bookListWidth > this.listContainer.nativeElement.clientWidth) {
        this.rightBttonVisible = 1;
      }
      if (this.bookListPos === 0) {
        this.leftBttnVisible = 0;
      }
    }
  }

  goLeft() {
    if (this.bookListPos + this.bookListWidth > this.listContainer.nativeElement.clientWidth) {
      this.bookListPos -= 160;
      this.leftBttnVisible = 1;
      if (this.bookListPos + this.bookListWidth < this.listContainer.nativeElement.clientWidth) {
        this.rightBttonVisible = 0;
      }
    }
  }

  onResize() {
    if (this.bookListPos + this.bookListWidth > this.listContainer.nativeElement.clientWidth) {
      this.rightBttonVisible = 1;
    } else {
      this.rightBttonVisible = 0;
    }
  }

  redirectToCategory() {
    this.router.navigate(['bookscategory/' + this.linkTo]);
  }
}
