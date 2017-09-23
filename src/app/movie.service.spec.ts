import { TestBed, inject } from '@angular/core/testing';
import { Headers, Http } from '@angular/http';
import { Configuration } from './app.constants';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieService, Configuration, { provide: Http }]
    });
  });

  it('should be created', inject([MovieService], (service: MovieService) => {
    expect(service).toBeTruthy();
  }));
});
