import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarComponent} from './nav-bar.component';
import {provideRouter} from "@angular/router";
import {of} from "rxjs";
import {AuthService} from "../../../core/services/auth/auth.service";

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  const mockAuthService = {
    isAuthenticated$: of(false),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        provideRouter([])
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
