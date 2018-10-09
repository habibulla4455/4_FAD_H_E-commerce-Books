import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../../services/database.service';
import {Book} from '../../model/book';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  id: string;
  private sub: any;
  book: Book;

  constructor(private route: ActivatedRoute, private dbService: DatabaseService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.dbService.getBookById(this.id);
    });
    this.dbService.book.subscribe( book => {
      this.book = book[0];
      console.log(book[0]);
    });
  }

}
