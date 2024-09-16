import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgExerciseDetailsDisplayComponent } from './my-prog-exercise-details-display.component';

describe('MyProgExerciseDetailsDisplayComponent', () => {
  let component: MyProgExerciseDetailsDisplayComponent;
  let fixture: ComponentFixture<MyProgExerciseDetailsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExerciseDetailsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProgExerciseDetailsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
