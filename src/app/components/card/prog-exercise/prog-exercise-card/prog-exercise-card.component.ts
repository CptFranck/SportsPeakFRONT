import {Component, computed, input, output} from '@angular/core';
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {getProgExerciseTime} from "../../../../utils/prog-exercise-functions";
import {RouterLink} from "@angular/router";
import {getTargetSetsInformation} from "../../../../utils/target-set-functions";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

@Component({
  selector: 'app-prog-exercise-card',
  imports: [
    ModalButtonComponent,
    RouterLink
  ],
  templateUrl: './prog-exercise-card.component.html'
})
export class ProgExerciseCardComponent {

  readonly modalId = input.required<string>();
  readonly progExercise = input.required<ProgExercise>();

  readonly exerciseTime = computed<string>(() => getProgExerciseTime(this.progExercise()));
  readonly targetSets = computed<string[]>(() => getTargetSetsInformation(this.progExercise()));

  readonly actionProgExercises = output<FormIndicator>();

  showProgExercisePreview(progExercise: ProgExercise): void {
    this.actionProgExercises.emit({
      actionType: ActionEnum.read,
      object: progExercise
    });
  }

  showProgExercisePerformance(progExercise: ProgExercise): void {
    this.actionProgExercises.emit({
      actionType: ActionEnum.checkPerformance,
      object: progExercise
    });
  }
}
