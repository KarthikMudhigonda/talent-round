import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { BuyComponent } from './buy/buy.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'movies-list', component: MovieListComponent },
  { path: 'movies-display', component: MovieDisplayComponent },
  { path: 'buy/:id', component: BuyComponent },
  { path: 'cart', component: CartComponent },
  {path:"search", component:SearchComponent},
  {path:'search/:query', component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
