import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgExerciseDeleteFormComponent } from './my-prog-exercise-delete-form.component';

describe('MyProgExerciseDeleteFormComponent', () => {
  let component: MyProgExerciseDeleteFormComponent;
  let fixture: ComponentFixture<MyProgExerciseDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExerciseDeleteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProgExerciseDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
