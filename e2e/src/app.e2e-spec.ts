import {AppPage} from './app.po';
import {browser} from 'protractor';

describe('new App', () => {
    let page: AppPage;
    const url = 'http://localhost:4200/login';

    beforeEach(() => {
        page = new AppPage();
    });

    // it('should display welcome message', () => {
    //     page.navigateTo();
    //     expect(page.getParagraphText()).toContain('The world is your oyster.');
    // });

    it('should have a title',  () => {
        browser.get(url);
        expect(browser.getTitle()).toEqual('Greed Island+');
    });
});
