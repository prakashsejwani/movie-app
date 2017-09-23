import { Component, Input } from '@angular/core';
import { Movie }        from '../movie';

@Component({
  selector: 'app-movie-show',
  templateUrl: './movie-show.component.html',
  styleUrls: ['./movie-show.component.css']
})
export class MovieShowComponent {
  @Input() movie: Movie;
}
