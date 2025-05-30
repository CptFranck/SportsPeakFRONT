import {Component, input, model, output} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../interface/enum/action-type";
import {
  MyProgExerciseDetailsDisplayComponent
} from "../../../../components/modal-component/prog-exercise/my-prog-exercise-details-display/my-prog-exercise-details-display.component";
import {
  MyProgExerciseEntityFormComponent
} from "../../../../components/form/prog-exercise/my-prog-exercise-entity-form/my-prog-exercise-entity-form.component";
import {
  MyProgExercisePerformanceComponent
} from "../../../../components/modal-component/prog-exercise/my-prog-exercise-performance/my-prog-exercise-performance.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";

@Component({
  selector: 'app-my-prog-exercise-modal',
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MyProgExerciseDetailsDisplayComponent,
    MyProgExerciseEntityFormComponent,
    MyProgExercisePerformanceComponent,
  ],
  templateUrl: './my-prog-exercises-modal.component.html'
})
export class MyProgExercisesModalComponent {
  readonly modalTitle = input.required<string>();
  readonly muscleModalId = input.required<string>();
  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly action = model.required<ActionType>();

  readonly actionProgExercises = output<FormIndicator>();

  protected readonly ActionType = ActionType;

  onClick() {
    this.actionProgExercises.emit({
      object: undefined,
      actionType: ActionType.create
    })
  }
}
