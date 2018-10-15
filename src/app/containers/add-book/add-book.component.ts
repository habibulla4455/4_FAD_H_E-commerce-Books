import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {DatabaseService} from '../../services/database.service';
import {EditBookService} from '../../services/edit-book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBookForm: FormGroup;
  categoryList = [
    'action/adventure', 'art/music', 'biographies',
    'comics', 'cooking', 'crime', 'drama', 'fantasy/SciFi',
    'history', 'horror', 'kids', 'romance', 'science', 'travel', 'other'
  ];
  book = new ReactiveBook();
  editingMode = false;
  editedBookId: string;

  constructor(
    private authService: AuthService,
    private dbService: DatabaseService,
    private editBookService: EditBookService
  ) {
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
      bookDescriptionDetail: new FormArray([new FormControl(null, Validators.required)])
    });
    this.editBookService.bookIsEdited.subscribe(bookIsEdited => {
      this.editingMode = bookIsEdited;
    });
    this.editBookService.bookEdited.subscribe(editedBook => {
      this.editedBookId = editedBook.key;
      this.addBookForm.controls.bookName.setValue(editedBook.name);
      this.addBookForm.controls.bookAuthor.setValue(editedBook.author);
      this.addBookForm.controls.bookPublisher.setValue(editedBook.publisher);
      this.addBookForm.controls.bookReleased.setValue(editedBook.released);
      this.addBookForm.controls.bookCategory.setValue(editedBook.category);
      this.addBookForm.controls.imageUrl.setValue(editedBook.imageUrl);
      this.addBookForm.controls.bookDescriptionMain.setValue(editedBook.descriptionMain);
      if (editedBook.descriptionDetail) {
        const arr = <FormArray>this.addBookForm.get('bookDescriptionDetail');
        arr.removeAt(0);
        for (let i = 0; i < editedBook.descriptionDetail.length; i++) {
          arr.push(new FormControl(editedBook.descriptionDetail[i], Validators.required));
        }
      }
    });
  }

  newParagraph() {
    const arr = <FormArray>this.addBookForm.get('bookDescriptionDetail');
    arr.push(new FormControl(null, Validators.required));
  }

  onSubmit() {
    this.book.author = this.addBookForm.value.bookAuthor;
    this.book.category = this.addBookForm.value.bookCategory;
    this.book.created = new Date().toLocaleDateString();
    this.book.descriptionDetail = this.addBookForm.value.bookDescriptionDetail;
    this.book.descriptionMain = this.addBookForm.value.bookDescriptionMain;
    this.book.imageUrl = this.addBookForm.value.imageUrl;
    this.book.name = this.addBookForm.value.bookName;
    this.book.publisher = this.addBookForm.value.bookPublisher;
    this.book.released = this.addBookForm.value.bookReleased;
    this.book.userId = this.authService.user.uid;
    if (this.editingMode) {
      this.dbService.editBook(this.editedBookId, this.book);
    } else {
      this.dbService.createNewBook(this.book);
    }
  }

  removeDetailPos(index: number ){
    const arr = <FormArray>this.addBookForm.get('bookDescriptionDetail');
    arr.removeAt(index);
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
