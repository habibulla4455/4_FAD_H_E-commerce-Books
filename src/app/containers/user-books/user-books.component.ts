import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {DatabaseService} from '../../services/database.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent implements OnInit {

  booksList: Array<Book>;

  constructor(
    private dbService: DatabaseService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.dbService.bookList.subscribe(books => {
      this.booksList = books.filter(book => book.userId === this.authService.user.uid);
    });
  }
}
