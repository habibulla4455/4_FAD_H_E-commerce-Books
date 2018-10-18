import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menuVisible = false;

  constructor(private router: Router) {

  }

  menuStateChanged(menuVis: boolean) {
    this.menuVisible = menuVis;
  }

  navigateToCategory(category: string) {
    this.router.navigate(['bookscategory/' + category]);
    this.menuVisible = false;
  }
}
