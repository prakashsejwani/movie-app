import {
   async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { Movie } from './movie';
import { MovieService } from './movie.service';
import { Configuration } from './app.constants';

const makeMovieData = () => [
  { id: 1, title: 'Windstorm', adult: true, 'poster_path': '/Windstorm.jpg' },
  { id: 2, title: 'Bombasto', adult: false, 'poster_path': '/Bombasto.jpg' },
  { id: 3, title: 'Magneta', adult: true, 'poster_path': '/Magneta.jpg' },
  { id: 4, title: 'Tornado', adult: false, 'poster_path': '/Tornado.jpg' }
] as Movie[];

////////  Tests  /////////////
describe('MovieService (mockBackend)', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        MovieService,
        Configuration,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
    .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([MovieService], (service: MovieService) => {
      expect(service instanceof MovieService).toBe(true);
  }));



  it('can instantiate service with "new"', inject([Http, Configuration],
    (http: Http, _configuration: Configuration) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new MovieService(http, _configuration);
    expect(service instanceof MovieService).toBe(true, 'new service should be ok');
  }));


  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
  }));

  describe('when getPopularMovies', () => {
      let backend: MockBackend;
      let service: MovieService;
      let fakeMovies: Movie[];
      let response: Response;

      beforeEach(inject([Http, Configuration, XHRBackend],
        (http: Http, _configuration: Configuration, be: MockBackend) => {
        backend = be;
        service = new MovieService(http, _configuration);
        fakeMovies = makeMovieData();
        let options = new ResponseOptions({status: 200, body: {results: fakeMovies}});
        response = new Response(options);
      }));

      it('should have expected fake movies (then)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getPopularMovies().toPromise()
        // .then(() => Promise.reject('deliberate'))
          .then(movies => {
            expect(movies.length).toBe(fakeMovies.length,
              'should have expected no. of movies');
          });
      })));

      it('should have expected fake movies (Observable.do)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getPopularMovies()
          .do(movies => {
            expect(movies.length).toBe(fakeMovies.length,
              'should have expected no. of movies');
          })
          .toPromise();
      })));


      it('should be OK returning no movies', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 200, body: {results: []}}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        service.getPopularMovies()
          .do(movies => {
            expect(movies.length).toBe(0, 'should have no movies');
          })
          .toPromise();
      })));

      it('should treat 404 as an Observable error', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 404}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        service.getPopularMovies()
          .do(movies => {
            fail('should not respond with movies');
          })
          .catch(err => {
            expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
            return Observable.of(null); // failure is the expected test result
          })
          .toPromise();
      })));
  });
});
