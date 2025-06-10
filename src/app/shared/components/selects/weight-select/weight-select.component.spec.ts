import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightSelectComponent } from './weight-select.component';

describe('WeightSelectComponent', () => {
  let component: WeightSelectComponent;
  let fixture: ComponentFixture<WeightSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeightSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
