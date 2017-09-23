import { Component, OnInit } from '@angular/core';

import { Movie }        from '../movie';
import { MovieService } from '../movie.service';
import { Configuration } from '../app.constants';

@Component({
  selector: 'app-movie-index',
  templateUrl: './movie-index.component.html',
  styleUrls: ['./movie-index.component.css']
})
export class MovieIndexComponent implements OnInit {
  movies: Movie[] = [];
  selectedMovie: Movie;

  constructor(private movieService: MovieService, private _configuration: Configuration) { }

  getPopularMovies(): void {
    this.movieService.getPopularMovies()
      .then(movies => {
        this.movies = movies.map(value => {
          value['poster_path'] = `${this._configuration.ApiImageUrl}${value['poster_path']}`
          return value;
        });

      })
  }

  ngOnInit(): void {
    this.getPopularMovies();
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }
}

