import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatabaseService} from '../../services/database.service';
import {Book} from '../../model/book';
import {AuthService} from '../../services/auth.service';
import {EditBookService} from '../../services/edit-book.service';

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

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    public authservice: AuthService,
    private editBookService: EditBookService,
    private router: Router
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
  }

  addToRead() {
    alert('This Functionality not yet implemented in application');
  }

  deleteBook() {
    this.dbService.deleteBook(this.id);
  }

  editbook() {
    this.editBookService.bookEditedSet({key: this.id, ...this.book});
    this.router.navigate(['addbook']);
  }
}
