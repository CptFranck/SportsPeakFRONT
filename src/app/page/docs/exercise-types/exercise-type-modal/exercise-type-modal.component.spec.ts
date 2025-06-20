import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseTypeModalComponent} from './exercise-type-modal.component';
import {ActionType} from "../../../../shared/model/enum/action-type";

describe('ExerciseTypeModalComponent', () => {
  let component: ExerciseTypeModalComponent;
  let fixture: ComponentFixture<ExerciseTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseTypeModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseTypeModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('modalTitle', "title");
    fixture.componentRef.setInput('exerciseTypeModalId', "Id");
    fixture.componentRef.setInput('exerciseType', undefined);
    fixture.componentRef.setInput('action', ActionType.read);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
