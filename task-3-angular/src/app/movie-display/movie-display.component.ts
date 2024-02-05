import { Component, OnInit } from '@angular/core';
import { movies } from 'src/app/services/movieInterface';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css'],
})
export class MovieDisplayComponent implements OnInit {
  movies: movies[] = [];
  login: any;

  constructor(
    private movieservice: MovieService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchMoviesData();
    this.getLoginUser();
  }

  fetchMoviesData() {
    this.movieservice.getAllMovies().subscribe(
      (data: movies[]) => {
        // Shuffle the movies array
        this.movies = this.shuffleArray(data);
      },
      (error) => {
        console.log('Error fetching movies data:', error);
      }
    );
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  showDetails(movie: movies) {
    movie.showDetails = true;
  }

  hideDetails(movie: movies) {
    movie.showDetails = false;
  }

  buy(id) {
    console.log(id);
    this.router.navigate(['buy', id]);
  }

  cart(movie) {
    movie.userEmail = this.login.email;
    this.cartService.addToCart(movie).subscribe((data) => console.log(data));
  }

  getLoginUser() {
    this.login = JSON.parse(sessionStorage.getItem('login') || '[]');
  }
}
