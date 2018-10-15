import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Book} from '../../model/book';
import {Router} from '@angular/router';

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

  @ViewChild('listContainer') listContainer: ElementRef;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.bookListPos + this.bookListWidth > this.listContainer.nativeElement.clientWidth) {
      this.rightBttonVisible = 1;
    }
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
