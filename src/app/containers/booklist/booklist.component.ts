import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../services/database.service';
import {Book} from '../../model/book';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  booksList = new BooksWithCategories();

  constructor(private dbService: DatabaseService) {
  }

  ngOnInit() {
    this.dbService.bookList.subscribe(books => {
      this.booksList.fantasySciFi = books.filter(book => {
        return book.category === 'fantasySciFi';
      });
      this.booksList.horror = books.filter(book => {
        return book.category === 'horror';
      });
      this.booksList.biographies = books.filter(book => {
        return book.category === 'biographies';
      });
    });
  }

}

class BooksWithCategories {
  constructor(
    public fantasySciFi?: Array<Book>,
    public horror?: Array<Book>,
    public biographies?: Array<Book>
  ) {
  }
}
