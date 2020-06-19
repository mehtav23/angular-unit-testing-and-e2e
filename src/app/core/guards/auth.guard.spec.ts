import { TestBed, getTestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthenticateService } from '../../shared/services/authenticate.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import {of} from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authenticateService: AuthenticateService;
  const routeMock: any = { snapshot: {}};
  const routeStateMock: any = { snapshot: {}, url: '/cookies'};
  const routerMock = {navigate: jasmine.createSpy('navigate')};
  beforeEach(() => {
     TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [AuthenticateService]
    });
     guard = TestBed.get(AuthGuard);
  });

  beforeEach(() => {
    authenticateService = TestBed.get(AuthenticateService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should be return true when user is not authenticated', () => {
    authenticateService.userAuthenticated = false;
    expect(guard.canActivate(routeMock, routeStateMock)).toBe(false);
  });
  it('should be return true when user is authenticated', () => {
    authenticateService.userAuthenticated = true;
    expect(guard.canActivate(routeMock, routeStateMock)).toBe(true);
  });
});
