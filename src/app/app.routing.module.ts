import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooklistComponent} from './containers/booklist/booklist.component';
import {AddBookComponent} from './containers/add-book/add-book.component';
import {LoginComponent} from './containers/login/login.component';
import {AuthGuardService} from './services/auth-guard.service';
import {SingleBookComponent} from './containers/single-book/single-book.component';
import {UserBooksComponent} from './containers/user-books/user-books.component';
import {ReadListComponent} from './containers/read-list/read-list.component';
import {BooklistCategoryComponent} from './containers/booklist-category/booklist-category.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: 'books', component: BooklistComponent},
  {path: 'books/:id', component: SingleBookComponent},
  {path: 'bookscategory/:id', component: BooklistCategoryComponent},
  {path: 'userbooks', component: UserBooksComponent, canActivate: [AuthGuardService]},
  {path: 'addbook', component: AddBookComponent, canActivate: [AuthGuardService]},
  {path: 'readlist', component: ReadListComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
