import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleSelectorComponent } from './muscle-selector.component';

describe('MuscleSelectorComponent', () => {
  let component: MuscleSelectorComponent;
  let fixture: ComponentFixture<MuscleSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuscleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
