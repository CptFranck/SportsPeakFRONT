import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeSelectorComponent } from './privilege-selector.component';

describe('PrivilegeSelectorComponent', () => {
  let component: PrivilegeSelectorComponent;
  let fixture: ComponentFixture<PrivilegeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivilegeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
