import {Component, computed, input, output} from '@angular/core';
import {ProgExercise} from "../../../model/dto/prog-exercise";
import {ModalButtonComponent} from "../../modal-button/modal-button.component";
import {FormIndicator} from "../../../model/common/form-indicator";
import {getProgExerciseTime} from "../../../../utils/prog-exercise-functions";
import {RouterLink} from "@angular/router";
import {getTargetSetsInformation} from "../../../../utils/target-set-functions";
import {ActionType} from "../../../model/enum/action-type";

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
      actionType: ActionType.read,
      object: progExercise
    });
  }

  showProgExercisePerformance(progExercise: ProgExercise): void {
    this.actionProgExercises.emit({
      actionType: ActionType.checkPerformance,
      object: progExercise
    });
  }
}
