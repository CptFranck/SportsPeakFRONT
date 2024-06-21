import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarMainMenuComponent } from './nav-bar-main-menu.component';

describe('NavBarMainMenuComponent', () => {
  let component: NavBarMainMenuComponent;
  let fixture: ComponentFixture<NavBarMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarMainMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
