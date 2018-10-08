import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
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
  leftBttnVisible = 0;
  rightBttonVisible = 0;

  @ViewChild('listContainer') listContainer: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.bookListPos = 0 + 'px';
    const pos = Number(this.bookListPos.substring(0, this.bookListPos.length - 2));
    const width = Number(this.bookListWidth.substring(0, this.bookListWidth.length - 2));
    if (pos + width > this.listContainer.nativeElement.clientWidth) {
      this.rightBttonVisible = 1;
    }
  }

  ngOnChanges(changes) {
    this.bookListWidth = changes.books.currentValue.length * 160 + 'px';
  }

  goRight() {
    const pos = Number(this.bookListPos.substring(0, this.bookListPos.length - 2));
    if (pos < 0) {
      this.bookListPos = pos + 160 + 'px';
      this.rightBttonVisible = 1;
      if (this.bookListPos === '0px') {
        this.leftBttnVisible = 0;
      }
    }
  }

  goLeft() {
    const pos = Number(this.bookListPos.substring(0, this.bookListPos.length - 2));
    const width = Number(this.bookListWidth.substring(0, this.bookListWidth.length - 2));
    if (pos + width > this.listContainer.nativeElement.clientWidth) {
      this.bookListPos = pos - 160 + 'px';
      this.leftBttnVisible = 1;
      if (pos - 160 + width < this.listContainer.nativeElement.clientWidth) {
        this.rightBttonVisible = 0;
      }
    }
  }
}
