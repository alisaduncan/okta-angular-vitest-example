import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { OktaAuthStateService } from '@okta/okta-angular';
import { EMPTY, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { describe, beforeEach, it, expect } from 'vitest';

describe('ProfileComponent', () => {
  const name = 'Awesome dev';
  // const authSpy = jasmine.createSpyObj('OktaAuthStateService', [], {
  //   authState$: of({
  //     isAuthenticated: true,
  //     idToken: {
  //       claims: {
  //         name
  //       }
  //     }
  //   })
  // });
  const state = {
    isAuthenticated: true,
    idToken: {
      claims: {
        name
      }
    }
  };

  const authMock = {
    authState$: of(state)
  };

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: OktaAuthStateService, useValue: authMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // xit('should show a welcoming message with username', () => {
  //   const message = fixture.debugElement.query(By.css('p')).nativeElement.innerText;
  //   expect(message).toContain(name);
  // });

  it('should return name', async () => {
    component.name$.subscribe(
      res => {
        expect(res).toBe(name);
        console.log('is there a done function to await?')
      }
    )
  });
});
