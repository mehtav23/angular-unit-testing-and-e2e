import { LoginPage } from './login.po';
import { browser, logging } from 'protractor';

describe('Login', () => {
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();
        browser.sleep(1000);
    });

    it('should take user to dashboard with correct credentials', () => {
        page.enterEmailId('test@test.com');
        page.enterPassword('test@123');
        browser.sleep(1000);
        page.doLogin();
        expect(browser.getCurrentUrl()).toBe(browser.baseUrl + 'dashboard');
      });

    it('user should display error message as "User info entered doesn\'t match" when incorrect credentials are entered', () => {
        page.enterEmailId('test@test.com');
        page.enterPassword('test@1234');
        browser.sleep(1000);
        page.doLogin();
        expect(page.errorDisplayElement.getText()).toEqual('User info entered doesn\'t match');
    });

    it('should display error message as Email Id is required when user login without entering emailId', () => {
        page.enterEmailId('');
        page.enterPassword('test');
        browser.sleep(1000);
        page.doLogin();
        expect(page.emailIdRqdEl.getText()).toEqual('Email Id is required');
      });

    it('should display error message as password is required when user login without entering password', () => {
        page.enterEmailId('test@test.com');
        page.enterPassword('');
        browser.sleep(1000);
        page.doLogin();
        expect(page.passwordRqdEl.getText()).toEqual('Password is required');
      });
});
