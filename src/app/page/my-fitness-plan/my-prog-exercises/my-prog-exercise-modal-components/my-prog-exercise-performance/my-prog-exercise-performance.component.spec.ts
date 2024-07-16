import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgExercisePerformanceComponent } from './my-prog-exercise-performance.component';

describe('MyProgExercisePerformanceComponent', () => {
  let component: MyProgExercisePerformanceComponent;
  let fixture: ComponentFixture<MyProgExercisePerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExercisePerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProgExercisePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
