import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarDocMenuComponent} from './nav-bar-doc-menu.component';
import {provideRouter} from "@angular/router";

describe('NavBarDocMenuComponent', () => {
  let component: NavBarDocMenuComponent;
  let fixture: ComponentFixture<NavBarDocMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([])
      ],
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
