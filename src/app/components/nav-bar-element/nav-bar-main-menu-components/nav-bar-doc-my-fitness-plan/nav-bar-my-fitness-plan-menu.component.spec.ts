import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarMyFitnessPlanMenuComponent} from './nav-bar-my-fitness-plan-menu.component';
import {provideRouter} from "@angular/router";

describe('NavBarExploreMenuComponent', () => {
  let component: NavBarMyFitnessPlanMenuComponent;
  let fixture: ComponentFixture<NavBarMyFitnessPlanMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarMyFitnessPlanMenuComponent],
      providers: [provideRouter([])],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavBarMyFitnessPlanMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
