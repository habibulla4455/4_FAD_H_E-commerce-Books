import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BooklistComponent} from './containers/booklist/booklist.component';
import {LoginComponent} from './containers/login/login.component';
import {AddBookComponent} from './containers/add-book/add-book.component';
import {AppRoutingModule} from './app.routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireDatabaseModule} from '@angular/fire/database';

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
    AddBookComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
