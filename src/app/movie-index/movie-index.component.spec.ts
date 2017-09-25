import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DebugElement }    from '@angular/core';
import { MovieIndexComponent } from './movie-index.component';
import { Movie }        from '../movie';
import { MovieService } from '../movie.service';
import { FakeMovieService }    from '../testing';
import { Configuration } from '../app.constants';

describe('MovieIndexComponent', () => {
  let component: MovieIndexComponent;
  let fixture: ComponentFixture<MovieIndexComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let spy: any;
  let movieService: MovieService;
  const testMovies =  "[{ id: 1, title: 'Windstorm', adult: true, 'vote_average': 12, 'poster_path': '/Windstorm.jpg' },{ id: 2, title: 'Bombasto', adult: false, 'vote_average': 13, 'poster_path': '/Bombasto.jpg' },{ id: 3, title: 'Magneta', adult: true, 'vote_average': 14, 'poster_path': '/Magneta.jpg' },{ id: 4, title: 'Tornado', adult: false, 'vote_average': 15, 'poster_path': '/Tornado.jpg' }]";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieIndexComponent ],
      providers: [{ provide: MovieService, useClass: FakeMovieService },
      Configuration],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieIndexComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();

    // movieService actually injected into the component
    movieService = TestBed.get(MovieService);

    // Setup spy on the `getPopularMovies` method
    spy = spyOn(movieService, 'getPopularMovies')
          .and.returnValue(Promise.resolve(testMovies));

    // Get the Movie list element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.movie-list'));
    el = de.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not show movies list before OnInit', () => {
    expect(el.textContent.trim()).toBe('', 'nothing displayed');
    expect(spy.calls.any()).toBe(false, 'getPopularMovies not yet called');
  });

  // TODO Uncaught NetworkError: Failed to execute 'send' on 'XMLHttpRequest'
  // it('should still not show movies list after component initialized', () => {
  //   fixture.detectChanges();
  //   // getPopularMovies service is async => still has not returned with quote
  //   expect(el.textContent.trim()).toBe('', 'no movies yet');
  //   expect(spy.calls.any()).toBe(true, 'getPopularMovies called');
  // });

  // it('should show movies list after getPopularMovies promise (async)', async(() => {
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => { // wait for async getPopularMovies
  //     fixture.detectChanges();        // update view with movies
  //     expect(el.textContent).toBe(testMovies);
  //   });
  // }));
});
