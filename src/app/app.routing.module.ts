import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooklistComponent} from './containers/booklist/booklist.component';
import {AddBookComponent} from './containers/add-book/add-book.component';
import {LoginComponent} from './containers/login/login.component';
import {AuthGuardService} from './services/auth-guard.service';
import {SingleBookComponent} from './containers/single-book/single-book.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: 'books', component: BooklistComponent},
  {path: 'books/:id', component: SingleBookComponent},
  {path: 'addbook', component: AddBookComponent, /*canActivate: [AuthGuardService]*/},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
