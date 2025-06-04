import {Component, computed, input, output} from '@angular/core';
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {getProgExerciseTime} from "../../../../utils/prog-exercise-functions";
import {ActionTypeEnum} from "../../../../shared/model/enum/action-type.enum";
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {
  ProgExerciseTrustLabelFormComponent
} from "../../../form/prog-exercise/prog-exercise-trust-label-form/prog-exercise-trust-label-form.component";

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
      actionType: ActionTypeEnum.checkPerformance,
      object: progExercise
    });
  }

  modifyProgExercise(progExercise: ProgExercise) {
    this.actionProgExercises.emit({
      actionType: ActionTypeEnum.update,
      object: progExercise
    });
  }

  delProgExercise(progExercise: ProgExercise) {
    this.actionProgExercises.emit({
      actionType: ActionTypeEnum.delete,
      object: progExercise
    });
  }
}
