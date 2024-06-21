import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAdminMenuComponent } from './nav-bar-admin-menu.component';

describe('NavBarAdminMenuComponent', () => {
  let component: NavBarAdminMenuComponent;
  let fixture: ComponentFixture<NavBarAdminMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarAdminMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarAdminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
