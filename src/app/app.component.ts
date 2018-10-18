import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  menuVisible = false;
  menuPos = -300;

  constructor(private router: Router) {

  }

  ngOnInit() {
    if (window.innerWidth > 1780) {
      this.menuPos = 0;
    }
  }

  menuStateChanged(menuVis: boolean) {
    this.menuVisible = menuVis;
    if(this.menuVisible) {
      this.menuPos= 0;
    } else {
      if(window.innerWidth <=  1780 ) {
        this.menuPos = -300;
      }
    }

  }

  onResize() {
    if(window.innerWidth > 1780) {
      this.menuPos = 0;
      this.menuVisible = false;
    } else {
      if(!this.menuVisible) {
        this.menuPos = -300;
      }
    }
  }

}
