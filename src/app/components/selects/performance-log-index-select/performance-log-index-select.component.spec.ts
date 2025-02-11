import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PerformanceLogIndexSelectComponent} from './performance-log-index-select.component';

describe('PerformanceLogIndexSelectComponent', () => {
  let component: PerformanceLogIndexSelectComponent;
  let fixture: ComponentFixture<PerformanceLogIndexSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogIndexSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceLogIndexSelectComponent);
    component = fixture.componentInstance;

    component.index = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
