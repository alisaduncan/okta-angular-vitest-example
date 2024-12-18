import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { describe, expect, afterEach, beforeEach, it } from 'vitest';

import { authInterceptor } from './auth.interceptor';
import { OKTA_AUTH } from '@okta/okta-angular';


describe('authInterceptor', () => {
  // const authServiceSpy = jasmine.createSpyObj<OktaAuth>(['getAccessToken']);
  const authServiceSpy = {
    getAccessToken: () => 'let-me-in'
  }
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: OKTA_AUTH, useValue: authServiceSpy }
      ]
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  beforeEach(inject([HttpClient, HttpTestingController], (http: HttpClient, httpTestController: HttpTestingController) => {
    httpClient = http;
    httpMock = httpTestController;
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('adds the Authorization header when url is in allowed list', () => {
    httpClient.get('/api').subscribe({
      next: response => expect(response).toBeTruthy(),
      error: err => fail(err)
    });

    const req = httpMock.expectOne(r => r.headers.has('Authorization'));
    req.flush({hello: 'world'});
    httpMock.verify();
  });
});
