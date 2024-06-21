import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarUserMenuComponent } from './nav-bar-user-menu.component';

describe('NavBarUserMenuComponent', () => {
  let component: NavBarUserMenuComponent;
  let fixture: ComponentFixture<NavBarUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarUserMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
