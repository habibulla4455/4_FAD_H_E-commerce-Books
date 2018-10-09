import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {DatabaseService} from '../../services/database.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBookForm: FormGroup;
  categoryList = ['horror', 'fantasySciFi', 'other'];
  book = new ReactiveBook();

  constructor(private authService: AuthService, private dbService: DatabaseService) {
  }

  ngOnInit() {
    this.addBookForm = new FormGroup({
      bookName: new FormControl(null, Validators.required),
      bookAuthor: new FormControl(null, Validators.required),
      bookPublisher: new FormControl(null, Validators.required),
      bookReleased: new FormControl(null, Validators.required),
      bookCategory: new FormControl(this.categoryList[2]),
      imageUrl: new FormControl(null, Validators.required),
      bookDescriptionMain: new FormControl(null, Validators.required),
      bookDescriptionDetail: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.book.author = this.addBookForm.value.bookAuthor;
    this.book.category = this.addBookForm.value.bookCategory;
    this.book.created = new Date().toLocaleDateString();
    this.book.descriptionDetail = [this.addBookForm.value.bookDescriptionDetail];
    this.book.descriptionMain = this.addBookForm.value.bookDescriptionMain;
    this.book.imageUrl = this.addBookForm.value.imageUrl;
    this.book.name = this.addBookForm.value.bookName;
    this.book.publisher = this.addBookForm.value.bookPublisher;
    this.book.released = this.addBookForm.value.bookReleased;
    this.book.userId = this.authService.user.uid;
    console.log(this.book);
    this.dbService.createNewBook(this.book);
  }
}

class ReactiveBook {
  constructor(
    public author?: string,
    public category?: string,
    public created?: string,
    public descriptionDetail?: Array<string>,
    public descriptionMain?: string,
    public imageUrl?: string,
    public name?: string,
    public publisher?: string,
    public released?: string,
    public userId?: string
  ) {
  }
}
