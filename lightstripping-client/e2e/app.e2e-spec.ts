import { LightstrippingClientPage } from './app.po';

describe('lightstripping-client App', function() {
  let page: LightstrippingClientPage;

  beforeEach(() => {
    page = new LightstrippingClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
