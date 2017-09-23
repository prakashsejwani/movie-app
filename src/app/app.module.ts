import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MovieService } from './movie.service';
import { MovieIndexComponent } from './movie-index/movie-index.component'
import { Configuration } from './app.constants';
import { MovieShowComponent } from './movie-show/movie-show.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieIndexComponent,
    MovieShowComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [MovieService,
    Configuration],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
