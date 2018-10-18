import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {EditBookService} from '../../services/edit-book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() menuVisState = new EventEmitter<boolean>();

  constructor(public authService: AuthService, private editBookService: EditBookService) {

  }

  logOut() {
    this.editBookService.bookEditedReset();
    this.authService.logOut();
  }

  resetBookEdit() {
    this.editBookService.bookEditedReset();
  }

  toggleMenuState() {
    this.menuVisState.emit(true);
  }
}
