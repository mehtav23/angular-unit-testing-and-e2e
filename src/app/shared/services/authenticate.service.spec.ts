import { TestBed, inject } from '@angular/core/testing';
import { AuthenticateService } from './authenticate.service';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthenticateService', () => {
  let service: AuthenticateService;
  let httpClient: HttpClient;


  const userData = {
    users: [
        {
          emailId: 'test@test.com',
          password : 'test@123'
        }
      ]
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    });
  });
  beforeEach(inject([HttpClient],
    ( httpclient: HttpClient) => {
        httpClient = httpclient;
    }));

  beforeEach(() => {
      service = TestBed.get(AuthenticateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return true if valid user is passed in parameter', () => {
    spyOn(httpClient, 'get').and.returnValue(of(userData));
    const credentials = {
      emailId: 'test@test.com',
      password: 'test@123'
    };
    service.checkUser(credentials).subscribe(data => {
        expect(data).toBe(true);
    });
  });

  it('should return false if invalid user is passed in parameter', () => {
    spyOn(httpClient, 'get').and.returnValue(of(userData));
    const credentials = {
      emailId: 'test@test.com',
      password: 'test@1234'
    };
    service.checkUser(credentials).subscribe(data => {
        expect(data).not.toBe(true);
    });
  });
});
