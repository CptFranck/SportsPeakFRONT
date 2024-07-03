import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarMyFitnessPlanMenuComponent} from './nav-bar-my-fitness-plan-menu.component';

describe('NavBarExploreMenuComponent', () => {
  let component: NavBarMyFitnessPlanMenuComponent;
  let fixture: ComponentFixture<NavBarMyFitnessPlanMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarMyFitnessPlanMenuComponent]
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
