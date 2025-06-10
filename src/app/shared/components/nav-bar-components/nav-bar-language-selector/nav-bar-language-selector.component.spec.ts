import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarLanguageSelectorComponent } from './nav-bar-language-selector.component';

describe('NavBarLanguageSelectorComponent', () => {
  let component: NavBarLanguageSelectorComponent;
  let fixture: ComponentFixture<NavBarLanguageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarLanguageSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarLanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
