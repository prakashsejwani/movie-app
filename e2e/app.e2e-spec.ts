import { MovieAppPage } from './app.po';

describe('movie-app App', () => {
  let page: MovieAppPage;

  beforeEach(() => {
    page = new MovieAppPage();
  });

  it('should display header message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Movie Viewer');
  });
});
