import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../services/database.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
  }

  getBooks() {
    this.dbService.getBooks();
  }

}
