import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BooklistComponent} from './booklist/booklist.component';
import {LoginComponent} from './login/login.component';
import {AddBookComponent} from './add-book/add-book.component';
import {AppRoutingModule} from './app.routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';

const config = {
  apiKey: 'AIzaSyCxwmvvDy6NoUe5Xn3SGg383Zijls1y-RY',
  authDomain: 'books-service-angular.firebaseapp.com',
  databaseURL: 'https://books-service-angular.firebaseio.com',
  projectId: 'books-service-angular',
  storageBucket: 'books-service-angular.appspot.com',
  messagingSenderId: '128862351310'
};

@NgModule({
  declarations: [
    AppComponent,
    BooklistComponent,
    LoginComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
