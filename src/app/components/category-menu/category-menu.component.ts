import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateToCategory(category: string) {
    this.router.navigate(['bookscategory/' + category]);
  }
}
