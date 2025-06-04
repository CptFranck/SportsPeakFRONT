import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExerciseDeleteFormComponent} from './my-prog-exercise-delete-form.component';
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";

describe('MyProgExerciseDeleteFormComponent', () => {
  let component: MyProgExerciseDeleteFormComponent;
  let fixture: ComponentFixture<MyProgExerciseDeleteFormComponent>;
  let mockProgExerciseService: jasmine.SpyObj<ProgExerciseService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: ProgExerciseService, useValue: mockProgExerciseService}],
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
