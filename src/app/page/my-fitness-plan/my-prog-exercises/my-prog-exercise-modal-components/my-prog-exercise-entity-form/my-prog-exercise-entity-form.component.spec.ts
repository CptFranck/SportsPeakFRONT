import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgExerciseEntityFormComponent } from './my-prog-exercise-entity-form.component';

describe('MyProgExerciseEntityFormComponent', () => {
  let component: MyProgExerciseEntityFormComponent;
  let fixture: ComponentFixture<MyProgExerciseEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExerciseEntityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProgExerciseEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
