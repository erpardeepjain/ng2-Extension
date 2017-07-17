import { MEANPage } from './app.po';

describe('mean App', () => {
  let page: MEANPage;

  beforeEach(() => {
    page = new MEANPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
