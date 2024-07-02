import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarExploreMenuComponent } from './nav-bar-explore-menu.component';

describe('NavBarExploreMenuComponent', () => {
  let component: NavBarExploreMenuComponent;
  let fixture: ComponentFixture<NavBarExploreMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarExploreMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarExploreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
