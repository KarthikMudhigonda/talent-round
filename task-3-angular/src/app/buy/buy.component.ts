import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { movies } from 'src/app/services/movieInterface';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  faXmark = faXmark;
  movie: movies;
  ordered: boolean = false;
  login: { name: string; email: string };
  orderDetails: { name: string; email: string; quantity: number };
  calculatedOrderID: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.getCurrentBuy();
    this.getLoginUser();
    this.initializeOrderDetails();
    this.calculatedOrderID = this.orderID();
  }

  getLoginUser() {
    this.login = JSON.parse(sessionStorage.getItem('login') || '[]');
  }

  getCurrentBuy() {
    this.activatedRoute.params.subscribe((param) => {
      this.movieService.getAllMovies().subscribe((res) => {
        this.movie = res.find((item) => item.id == param['id']);
        (this.movie);
      });
    });
  }
  placeOrder() {
    this.ordered = true;
  }

  orderID() {
    return Math.floor(Math.random() * 99999);
  }
  closepop() {
    this.ordered = false;
  }

  initializeOrderDetails() {
    this.orderDetails = {
      name: this.login?.name || '',
      email: this.login?.email || '',
      quantity: 1,
    };
  }
}
