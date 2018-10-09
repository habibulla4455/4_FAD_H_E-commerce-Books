import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBookForm: FormGroup;
  categoryList = ['horror', 'fantasySciFi'];
  book = new ReactiveBook();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.addBookForm = new FormGroup({
      bookName: new FormControl(null),
      bookAuthor: new FormControl(null),
      bookPublisher: new FormControl(null),
      bookReleased: new FormControl(null),
      bookCategory: new FormControl(this.categoryList[1]),
      imageUrl: new FormControl(null),
      bookDescriptionMain: new FormControl(null),
      bookDescriptionDetail: new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.addBookForm);
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
