import {Component, computed, input, output} from '@angular/core';
import {ProgExercise} from "../../../model/dto/prog-exercise";
import {FormIndicator} from "../../../model/common/form-indicator";
import {getProgExerciseTime} from "../../../../utils/prog-exercise-functions";
import {ModalButtonComponent} from "../../modal-button/modal-button.component";
import {
  ProgExerciseTrustLabelFormComponent
} from "../../forms/performance-log/prog-exercise-trust-label-form/prog-exercise-trust-label-form.component";
import {ActionType} from "../../../model/enum/action-type";

@Component({
  selector: 'app-prog-exercise-card-details',
  imports: [
    ModalButtonComponent,
    ProgExerciseTrustLabelFormComponent
  ],
  templateUrl: './prog-exercise-card-details.component.html'
})
export class ProgExerciseCardDetailsComponent {

  readonly modalId = input.required<string>();
  readonly progExercise = input.required<ProgExercise>();

  readonly exerciseTime = computed<string>(() => getProgExerciseTime(this.progExercise()));

  readonly actionProgExercises = output<FormIndicator>();

  showProgExercisePerformance(progExercise: ProgExercise): void {
    this.actionProgExercises.emit({
      actionType: ActionType.checkPerformance,
      object: progExercise
    });
  }

  modifyProgExercise(progExercise: ProgExercise) {
    this.actionProgExercises.emit({
      actionType: ActionType.update,
      object: progExercise
    });
  }

  delProgExercise(progExercise: ProgExercise) {
    this.actionProgExercises.emit({
      actionType: ActionType.delete,
      object: progExercise
    });
  }
}
