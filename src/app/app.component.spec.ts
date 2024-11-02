import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { of } from 'rxjs';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { describe, beforeEach, it, expect, vi, } from 'vitest';


describe('AppComponent', () => {
  // const authStateSpy = jasmine.createSpyObj('OktaAuthStateService', [], {
  //   authState$: of({
  //     isAuthenticated: false
  //   })
  // });

  const authStateMock = {
    authState$: of({
      isAuthenticated: false
    })
  };

  // const authSpy = jasmine.createSpyObj('OktaAuth', ['signInWithRedirect']);
  const authMock = {
    signInWithRedirect: () => {}
  };
  const authSpy = vi.spyOn(authMock, 'signInWithRedirect');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent
      ],
      providers: [
        { provide: OktaAuthStateService, useValue: authStateMock },
        { provide: OKTA_AUTH, useValue: authMock }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should call Okta's login method in the sign in method`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    await app.signIn().then(() => {
      authSpy.mock.calls.length === 1;
    });
  })
});
