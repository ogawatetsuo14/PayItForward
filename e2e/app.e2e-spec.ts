import { PayItForwardPage } from './app.po';

describe('pay-it-forward App', function() {
  let page: PayItForwardPage;

  beforeEach(() => {
    page = new PayItForwardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
