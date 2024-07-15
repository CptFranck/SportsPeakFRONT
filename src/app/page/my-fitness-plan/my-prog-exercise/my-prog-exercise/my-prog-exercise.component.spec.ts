import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgExerciseComponent } from './my-prog-exercise.component';

describe('MyProgExerciseComponent', () => {
  let component: MyProgExerciseComponent;
  let fixture: ComponentFixture<MyProgExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExerciseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProgExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
