import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Configuration } from './app.constants';
import { Movie } from './movie';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieService {
  private params = {'api_key': environment.apiKey, 'sort_by': 'popularity.desc'};
  private actionUrl: string;

  constructor(private http: Http, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;
  }

  getPopularMovies(): Promise<Movie[]> {
    return this.http.get(this.actionUrl, {params: this.params})
               .toPromise()
               .then(response => response.json().results as Movie[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
