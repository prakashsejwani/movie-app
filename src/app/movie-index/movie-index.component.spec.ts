import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieIndexComponent } from './movie-index.component';
import { MovieShowComponent } from '../movie-show/movie-show.component';
import { MovieService } from '../movie.service';
import { Configuration } from '../app.constants';
import { Http } from '@angular/http';

describe('MovieIndexComponent', () => {
  let component: MovieIndexComponent;
  let fixture: ComponentFixture<MovieIndexComponent>;
  let spy: any;
  let movieService: MovieService;
  let testMovies;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieIndexComponent, MovieShowComponent ],
      providers: [MovieService, Configuration, { provide: Http }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieIndexComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();

    // movieService actually injected into the component
    movieService = fixture.debugElement.injector.get(MovieService);

    // Setup spy on the `getPopularMovies` method
    spy = spyOn(movieService, 'getPopularMovies')
          .and.returnValue(Promise.resolve(testMovies));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
