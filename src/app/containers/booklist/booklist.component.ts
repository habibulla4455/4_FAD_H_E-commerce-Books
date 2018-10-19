import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../services/database.service';
import {Book} from '../../model/book';
import {EditBookService} from '../../services/edit-book.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  booksList = new BooksWithCategories();
  booksSearched: Array<Book>;
  searchPhrase = '';
  loggedOfStatus = false;

  constructor(
    private dbService: DatabaseService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.dbService.bookList.subscribe(books => {
      this.booksList.actionAndAdventure = books.filter(book => {
        return book.category === 'action/adventure';
      });
      this.booksList.artMusic = books.filter(book => {
        return book.category === 'art/music';
      });
      this.booksList.biographies = books.filter(book => {
        return book.category === 'biographies';
      });
      this.booksList.comics = books.filter(book => {
        return book.category === 'comics';
      });
      this.booksList.cooking = books.filter(book => {
        return book.category === 'cooking';
      });
      this.booksList.crime = books.filter(book => {
        return book.category === 'crime';
      });
      this.booksList.drama = books.filter(book => {
        return book.category === 'drama';
      });
      this.booksList.fantasySciFi = books.filter(book => {
        return book.category === 'fantasy/SciFi';
      });
      this.booksList.history = books.filter(book => {
        return book.category === 'history';
      });
      this.booksList.horror = books.filter(book => {
        return book.category === 'horror';
      });
      this.booksList.kids = books.filter(book => {
        return book.category === 'kids';
      });
      this.booksList.other = books.filter(book => {
        return book.category === 'other';
      });
      this.booksList.romance = books.filter(book => {
        return book.category === 'romance';
      });
      this.booksList.science = books.filter(book => {
        return book.category === 'science';
      });
      this.booksList.travel = books.filter(book => {
        return book.category === 'travel';
      });
    });
    this.authService.getUserLoggedOutStatus().subscribe(status => {
      this.loggedOfStatus = status;
    });
  }

  confirmSingOut() {
    this.loggedOfStatus = false;
    this.authService.resetLoginRegisterStatus();
  }

  searchChange() {
    this.booksSearched = [];
    if (this.searchPhrase !== '') {
      for (const key in this.booksList) {
        if (this.booksList[key]) {
          this.booksList[key].forEach(book => {
            if ((book.author.toLowerCase().indexOf(this.searchPhrase.toLowerCase()) > (-1)) ||
              book.name.toLowerCase().indexOf(this.searchPhrase.toLowerCase()) > (-1)) {
              this.booksSearched.push(book);
            }
          });
        }
      }
    }
  }
}

class BooksWithCategories {
  constructor(
    public actionAndAdventure?: Array<Book>,
    public artMusic?: Array<Book>,
    public biographies?: Array<Book>,
    public comics?: Array<Book>,
    public cooking?: Array<Book>,
    public crime?: Array<Book>,
    public drama?: Array<Book>,
    public fantasySciFi?: Array<Book>,
    public history?: Array<Book>,
    public horror?: Array<Book>,
    public kids?: Array<Book>,
    public other?: Array<Book>,
    public romance?: Array<Book>,
    public science?: Array<Book>,
    public travel?: Array<Book>
  ) {
  }
}
