import { browser, by, element, protractor } from 'protractor';

export class LoginPage {
    emailId = element(by.css('input[formControlName=emailId]'));
    password = element(by.css('input[formControlName=password]'));

    submitButton = element(by.buttonText('Login'));
    errorDisplayElement = element(by.cssContainingText('.is-invalid', 'User info entered doesn\'t match'));
    emailIdRqdEl = element(by.cssContainingText('.text-danger', 'Email Id is required'));
    passwordRqdEl = element(by.cssContainingText('.text-danger', 'Password is required'));
    loginForm = element(by.id('loginForm'));
    EC = protractor.ExpectedConditions;

    navigateTo(): Promise<any> {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    enterEmailId(emailId){
        this.emailId.sendKeys(emailId);
    }
    enterPassword(password){
        this.password.sendKeys(password);
      }
    doLogin(){
        this.loginForm.submit();
    }
}
