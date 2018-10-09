import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBookForm: FormGroup;

  categoryList = ['horror', 'fantasySciFi'];

  constructor() { }

  ngOnInit() {
    this.addBookForm = new FormGroup({
    });
  }

}
