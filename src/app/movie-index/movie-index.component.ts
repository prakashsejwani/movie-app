import { Component, OnInit } from '@angular/core';

import { Movie }        from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-index',
  templateUrl: './movie-index.component.html',
  styleUrls: ['./movie-index.component.css']
})
export class MovieIndexComponent implements OnInit {
movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getPopularMovies()
      .then(movies => this.movies = movies);
  }
}

