import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(private angularFire: AngularFireAuth, private router: Router) {
    angularFire.authState.subscribe(user => {
      this.user = user;
    });
  }

  logIn(email: string, password: string) {
    this.angularFire.auth.signInWithEmailAndPassword(email, password)
      .then( () => {
        this.router.navigate(['/books']);
      })
      .catch(err => {
        alert(err.message);
      });
  }

  signUp(email: string, password: string) {
    this.angularFire.auth.createUserWithEmailAndPassword(email, password)
      .then( () => {
        this.router.navigate(['/books']);
      })
      .catch(err => {
        alert(err.message);
      });
  }

  logOut() {
    this.angularFire.auth.signOut()
      .then( () => {
        this.router.navigate(['/books']);
      });
  }

}
