import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  public Server = 'https://api.themoviedb.org/';
  public ApiUrl = '3/discover/movie';
  public ServerWithApiUrl = this.Server + this.ApiUrl;
}
