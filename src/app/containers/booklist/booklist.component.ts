import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../services/database.service';
import {Book} from '../../model/book';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  booksList: Array<Book>;

  constructor(private dbService: DatabaseService) {
  }

  ngOnInit() {
    this.dbService.getBooks();
    this.dbService.bookList.subscribe(books => {
      this.booksList = books;
      console.log(this.booksList);
    });
  }

}
