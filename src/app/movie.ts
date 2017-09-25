export class Movie {
	constructor(public id = 0, public title = '',
		public adult = false, public vote_average = 0, public poster_path = '') { }
  clone() { return new Movie(this.id, this.title, this.adult, this.vote_average, this.poster_path); }
}
