import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { movies } from 'src/app/services/movieInterface';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url: string = 'http://localhost:1111/movies';

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<movies[]> {
    return this.http.get<movies[]>(this.url);
  }

  createMovie(movie: movies): Observable<movies> {
    return this.http.post<movies>(this.url, movie);
  }

  searchMovies(query: string): Observable<movies[]> {
    // Adjust the API endpoint for search as needed
    const searchUrl = `${this.url}?q=${query}`;

    // You can customize the search parameters based on your server's API
    const params = new HttpParams().set('query', query);

    return this.http.get<movies[]>(searchUrl, { params });
  }
}
