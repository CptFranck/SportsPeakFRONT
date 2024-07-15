import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExerciseDetailsModalComponent} from './my-prog-exercise-details-modal.component';

describe('MyProgExerciseModalComponent', () => {
  let component: MyProgExerciseDetailsModalComponent;
  let fixture: ComponentFixture<MyProgExerciseDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExerciseDetailsModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyProgExerciseDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
