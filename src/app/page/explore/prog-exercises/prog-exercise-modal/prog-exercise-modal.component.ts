import {Component, input} from '@angular/core';
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {
  MyProgExerciseDetailsDisplayComponent
} from "../../../../components/modal-component/prog-exercise/my-prog-exercise-details-display/my-prog-exercise-details-display.component";
import {ActionType} from "../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-prog-exercise-modal',
  imports: [
    ModalComponent,
    MyProgExerciseDetailsDisplayComponent
  ],
  templateUrl: './prog-exercise-modal.component.html'
})
export class ProgExerciseModalComponent {
  readonly modalTitle = input.required<string>();
  readonly progExerciseModalId = input.required<string>();
  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly action = input.required<ActionType>();

  protected readonly ActionType = ActionType;
}
