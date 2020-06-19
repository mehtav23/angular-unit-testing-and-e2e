import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticateService } from '../shared/services/authenticate.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import {of} from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authenticateService: AuthenticateService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule,
        HttpClientModule ],
      declarations: [ LoginComponent ],
      providers: [FormBuilder, AuthenticateService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    authenticateService = fixture.debugElement.injector.get(AuthenticateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values when login page is rendered', () => {
    expect(component.loginForm.value).toEqual({emailId: '', password: ''});
  });

  it('should set submitted and invalidCred to false on component init', () => {
    expect(component.submitted).toBe(false);
    expect(component.invalidCred).toBe(false);
  });

  it('should not call authenticate service check user if username or password is not entered', () => {
    component.loginForm.setValue({emailId: '', password: ''});
    spyOn(authenticateService, 'checkUser');
    component.login();
    expect(component.loginForm.valid).not.toBeTruthy();
    expect(authenticateService.checkUser).not.toHaveBeenCalled();
});

  it('should validate form to check if username and password are present when form is submitted', () => {
    spyOn(authenticateService, 'checkUser').and.returnValue(of(true));
    const navigateSpy = spyOn(component._router, 'navigate' );
    component.loginForm.setValue({emailId: 'test@test.com', password: 'test@123'});
    component.login();
    expect(component.submitted).toBe(true);
    expect(navigateSpy).toHaveBeenCalled();
    expect(component._router.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should redirect to login when unauthorized credentials are entered', () => {
    spyOn(authenticateService, 'checkUser').and.returnValue(of(false));
    const navigateSpy = spyOn(component._router, 'navigate' );
    component.loginForm.setValue({emailId: 'test@test.com', password: 'test@1234'});
    component.login();
    expect(component.submitted).toBe(true);
    expect(navigateSpy).toHaveBeenCalled();
    expect(component._router.navigate).toHaveBeenCalledWith(['login']);
  });


});
