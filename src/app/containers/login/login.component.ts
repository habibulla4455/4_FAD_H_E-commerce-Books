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
  registerFailed = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.resetLoginRegisterStatus();
    this.authService.getLoginStatus().subscribe(loginStatus => {
      this.loginFailed = loginStatus;
    });
    this.authService.getRegisterStatus().subscribe(registerStatus => {
      this.registerFailed = registerStatus;
    });
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

  getFirstPasswordRegisterColor(pas1) {
    if (pas1.valid) {
      return 'rgb(66, 226, 13)';
    }
    if (pas1.invalid && pas1.dirty) {
      return 'red';
    }
    return 'rgb(195, 195, 195)';
  }

  getPasswordRegisterColor(pas1, pas2) {
    if (pas1.dirty && pas2.dirty) {
      if ((pas1.value === pas2.value) && pas1.valid && pas2.valid) {
        return 'rgb(66, 226, 13)';
      }
      console.log(pas1);
      return 'red';
    }
    return 'rgb(195, 195, 195)';
  }
}
