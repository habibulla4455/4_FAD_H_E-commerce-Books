import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  @Output() menuVisState = new EventEmitter<boolean>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateToCategory(category: string) {
    this.router.navigate(['bookscategory/' + category]);
    this.menuVisState.emit(false);
  }
}
