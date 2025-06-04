import {Component, input, model, output} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {ActionTypeEnum} from "../../../../shared/model/enum/action-type.enum";
import {
  MyProgExerciseDetailsDisplayComponent
} from "../../../../components/modal-component/prog-exercise/my-prog-exercise-details-display/my-prog-exercise-details-display.component";
import {
  MyProgExerciseEntityFormComponent
} from "../../../../components/form/prog-exercise/my-prog-exercise-entity-form/my-prog-exercise-entity-form.component";
import {
  MyProgExercisePerformanceComponent
} from "../../../../components/modal-component/prog-exercise/my-prog-exercise-performance/my-prog-exercise-performance.component";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";

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
  readonly action = model.required<ActionTypeEnum>();

  readonly actionProgExercises = output<FormIndicator>();

  protected readonly ActionType = ActionTypeEnum;

  onClick() {
    this.actionProgExercises.emit({
      object: undefined,
      actionType: ActionTypeEnum.create
    })
  }
}
