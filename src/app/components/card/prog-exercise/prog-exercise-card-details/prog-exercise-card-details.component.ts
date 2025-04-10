import {Component, computed, input, output} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {getProgExerciseTime} from "../../../../utils/prog-exercise-functions";
import {ActionType} from "../../../../interface/enum/action-type";
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
