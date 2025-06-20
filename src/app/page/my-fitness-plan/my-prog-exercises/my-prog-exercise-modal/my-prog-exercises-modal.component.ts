import {Component, input, model, output} from '@angular/core';
import {ModalButtonComponent} from "../../../../shared/components/modal-button/modal-button.component";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {
  MyProgExerciseDetailsDisplayComponent
} from "../../../../shared/components/modal-components/my-prog-exercise-details-display/my-prog-exercise-details-display.component";
import {
  MyProgExerciseEntityFormComponent
} from "../../../../shared/components/forms/prog-exercise/my-prog-exercise-entity-form/my-prog-exercise-entity-form.component";
import {
  MyProgExercisePerformanceComponent
} from "../../../../shared/components/modal-components/my-prog-exercise-performance/my-prog-exercise-performance.component";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {ActionType} from "../../../../shared/model/enum/action-type";

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
  readonly progExerciseModalId = input.required<string>();
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
