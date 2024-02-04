import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { movies } from './movieInterface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url: string = 'http://localhost:1111/cartData';

  constructor(private http: HttpClient) {}

  viewCartContent(): Observable<movies[]> {
    return this.http.get<movies[]>(this.url);
  }

  addToCart(addProduct: movies): Observable<any[]> {
    return this.http.post<any[]>(this.url, addProduct);
  }
  deleteCart(id):Observable<movies[]>{
    return this.http.delete<any[]>(`${this.url}/${id}` )
  }
}
