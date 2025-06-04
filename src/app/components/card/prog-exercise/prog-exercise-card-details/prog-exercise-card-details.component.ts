import {Component, computed, input, output} from '@angular/core';
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {getProgExerciseTime} from "../../../../utils/prog-exercise-functions";
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {
  ProgExerciseTrustLabelFormComponent
} from "../../../form/prog-exercise/prog-exercise-trust-label-form/prog-exercise-trust-label-form.component";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

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
      actionType: ActionEnum.checkPerformance,
      object: progExercise
    });
  }

  modifyProgExercise(progExercise: ProgExercise) {
    this.actionProgExercises.emit({
      actionType: ActionEnum.update,
      object: progExercise
    });
  }

  delProgExercise(progExercise: ProgExercise) {
    this.actionProgExercises.emit({
      actionType: ActionEnum.delete,
      object: progExercise
    });
  }
}
