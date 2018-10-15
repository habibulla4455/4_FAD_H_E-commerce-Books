import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../model/book';
import {DatabaseService} from '../../services/database.service';

@Component({
  selector: 'app-booklist-category',
  templateUrl: './booklist-category.component.html',
  styleUrls: ['./booklist-category.component.css']
})
export class BooklistCategoryComponent implements OnInit {

  private sub: any;
  siteId: string;
  category: object;
  categoryIsValid = false;
  categoryList = [
    {path: 'actionadventure', name: 'Action and Adventure', basename: 'action/adventure'},
    {path: 'artmusic', name: 'Art and Music', basename: 'art/music'},
    {path: 'biographies', name: 'Biographies', basename: 'biographies'},
    {path: 'comics', name: 'Comics', basename: 'comics'},
    {path: 'cooking', name: 'Cooking', basename: 'cooking'},
    {path: 'crime', name: 'Crime', basename: 'crime'},
    {path: 'drama', name: 'Drama', basename: 'drama'},
    {path: 'fantasySciFi', name: 'Fantasy and SciFi', basename: 'fantasy/SciFi'},
    {path: 'history', name: 'History', basename: 'history'},
    {path: 'horror', name: 'Horror', basename: 'horror'},
    {path: 'romance', name: 'Romance', basename: 'romance'},
    {path: 'kids', name: 'Kids', basename: 'kids'},
    {path: 'science', name: 'Science', basename: 'science'},
    {path: 'travel', name: 'Travel', basename: 'travel'},
    {path: 'other', name: 'Other', basename: 'other'},
  ];
  booksList: Array<Book>;

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.siteId = params['id'];
      this.categoryList.forEach(element => {
        if (element.path === this.siteId) {
          this.categoryIsValid = true;
          this.category = element;
          this.dbService.bookList.subscribe(list => {
            this.booksList = list.filter(book => book.category === this.category['basename']);
          });
        }
      });
    });
  }
}
