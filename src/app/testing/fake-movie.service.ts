// re-export for tester convenience
export { Movie }        from '../movie';

import { Movie }        from '../movie';

export const MOVIES: Movie[] = [
  new Movie(41, 'Windstorm', true, 12, '/Windstorm.jpg'),
  new Movie(42, 'Bombasto', false, 13, '/Bombasto.jpg'),
  new Movie(43, 'Magneta', true, 14, '/Magneta.jpg'),
  new Movie(44, 'Tornado', false, 15, '/Tornado.jpg')
];

export class FakeMovieService {

  movies = MOVIES;
  lastPromise: Promise<any>;  // remember so we can spy on promise calls

  getPopularMovies() {
    return this.lastPromise = Promise.resolve<Movie[]>(this.movies);
  }
}
