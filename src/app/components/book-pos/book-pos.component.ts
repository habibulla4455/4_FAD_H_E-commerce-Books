import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-pos',
  templateUrl: './book-pos.component.html',
  styleUrls: ['./book-pos.component.css']
})
export class BookPosComponent implements OnInit {

  @Input() booksList: Array<Book>;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  redirect(bookId) {
    this.router.navigate(['books/' + bookId]);
  }
}
