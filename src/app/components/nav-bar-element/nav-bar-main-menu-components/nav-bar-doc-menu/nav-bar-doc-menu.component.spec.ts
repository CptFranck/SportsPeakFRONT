import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarDocMenuComponent} from './nav-bar-doc-menu.component';

describe('NavBarExploreMenuComponent', () => {
  let component: NavBarDocMenuComponent;
  let fixture: ComponentFixture<NavBarDocMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarDocMenuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavBarDocMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
