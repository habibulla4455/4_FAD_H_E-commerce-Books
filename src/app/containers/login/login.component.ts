import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFailed = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getLoginStatus().subscribe(loginStatus => {
      this.loginFailed = loginStatus;
    });
    this.authService.resetLoginStatus();
  }

  login(formData: NgForm) {
    this.authService.logIn(formData.value.email, formData.value.password);
  }

  signUp(formData: NgForm) {
    this.authService.signUp(formData.value.email, formData.value.password);
  }

  getInputLoginColor(email) {
    if (email.valid) {
      return 'rgb(66, 226, 13)';
    }
    if (email.invalid && email.dirty) {
      return 'red';
    }
    return 'rgb(195, 195, 195)';
  }
}
