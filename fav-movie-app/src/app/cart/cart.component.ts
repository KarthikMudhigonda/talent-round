import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { movies } from '../services/movieInterface';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  faXmark = faXmark;
  ordered: boolean = false;
  login: { name: string; email: string };
  orderDetails: { name: string; email: string; quantity: number };
  calculatedOrderID: number;

  cartItems: movies[];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    setInterval(() => {
      this.getLoginUser();
      this.getCartContent();
    }, 100);
    this.initializeOrderDetails();
    this.calculatedOrderID = this.orderID();
  }
  getLoginUser() {
    this.login = JSON.parse(sessionStorage.getItem('login') || '[]');
  }
  getCartContent() {
    this.cartService.viewCartContent().subscribe((data) => {
      this.cartItems = data.filter(
        (item) => item.userEmail == this.login.email
      );
      (this.cartItems);
    });
  }
  total() {
    let total = 0;
    if (this.cartItems) {
      this.cartItems.reduce((acc, item) => {
        total += item.price;
        return total;
      }, 0);
    }

    return total;
  }

  placeOrder() {
    console.log('Order placed:', this.orderDetails);
    this.ordered = true;
  }

  orderID() {
    return Math.floor(Math.random() * 99999);
  }
  closepop() {
    this.ordered = false;
  }
  initializeOrderDetails() {
    this.getLoginUser();
    this.orderDetails = {
      name: this.login?.name || '',
      email: this.login?.email || '',
      quantity: 1,
    };
  }

  removeItem(id) {
    this.cartService.deleteCart(id).subscribe((res) => {
      res;
    });
    id;
  }
}
