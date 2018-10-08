import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'app-book-cat-container',
  templateUrl: './book-cat-container.component.html',
  styleUrls: ['./book-cat-container.component.css']
})
export class BookCatContainerComponent implements OnInit, OnChanges {

  @Input() books: Array<Book>;
  @Input() categoryName: string;

  bookListWidth: string;
  bookListPos: string;

  constructor() {
  }

  ngOnInit() {
    this.bookListPos = 0 + 'px';
  }

  ngOnChanges(changes) {
    this.bookListWidth = changes.books.currentValue.length * 160 + 'px';
  }

  goRight() {
    const pos = Number(this.bookListPos.substring(0, this.bookListPos.length - 2));
    if (pos < 0) {
      this.bookListPos = pos + 160 + 'px';
    }
  }

  goLeft(listReference) {
    const pos = Number(this.bookListPos.substring(0, this.bookListPos.length - 2));
    const width = Number(this.bookListWidth.substring(0, this.bookListWidth.length - 2));
    if (pos + width > listReference.clientWidth) {
      this.bookListPos = pos - 160 + 'px';
    }
  }
}
