import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExerciseModalComponent} from './prog-exercise-modal.component';
import {ActionType} from "../../../../shared/model/enum/action-type";

describe('ProgExerciseModalComponent', () => {
  let component: ProgExerciseModalComponent;
  let fixture: ComponentFixture<ProgExerciseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgExerciseModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgExerciseModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('modalTitle', "title");
    fixture.componentRef.setInput('progExerciseModalId', "Id");
    fixture.componentRef.setInput('progExercise', undefined);
    fixture.componentRef.setInput('action', ActionType.read);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
