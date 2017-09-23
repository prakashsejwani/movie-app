import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MovieService } from './movie.service';
import { MovieIndexComponent } from './movie-index/movie-index.component'
import { Configuration } from './app.constants';

@NgModule({
  declarations: [
    AppComponent,
    MovieIndexComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [MovieService,
    Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
