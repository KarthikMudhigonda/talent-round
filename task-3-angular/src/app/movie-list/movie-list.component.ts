import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { movies } from 'src/app/services/movieInterface';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  newMovie: any;
  login: any;
  addMovie() {
    throw new Error('Method not implemented.');
  }
  movies: movies[] = [];
  currentSlideIndex: number = 0;

  constructor(private movieservice: MovieService, private router: Router ,private cartService :CartService) {}

  ngOnInit() {
    this.movieservice.getAllMovies().subscribe((data: movies[]) => {
      console.log(data);

      this.movies = data;
    });
    this.getLoginUser();
  }

  buy(id) {
    console.log(id);
    this.router.navigate(['buy', id]);
  }
  cart(movie) {
    movie.userEmail = this.login.email;
    this.cartService.addToCart(movie).subscribe((data) => (data));
    (movie);
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.movies.length;
  }

  prevSlide() {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.movies.length) % this.movies.length;
  }

  isCurrentSlide(index: number): boolean {
    return this.currentSlideIndex === index;
  }

  getLoginUser() {
    this.login = JSON.parse(sessionStorage.getItem('login') || '[]');
  }
}
