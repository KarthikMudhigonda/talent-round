import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service'; // Adjust the path

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  onSearchInput() {
    if (this.searchQuery.length >= 2) {
      this.movieService.searchMovies(this.searchQuery).subscribe(
        (results: any[]) => {
          this.searchResults = results;
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  navigateToMovie(movieId: number) {
    console.log('Navigate to movie with ID:', movieId);
  }
}
