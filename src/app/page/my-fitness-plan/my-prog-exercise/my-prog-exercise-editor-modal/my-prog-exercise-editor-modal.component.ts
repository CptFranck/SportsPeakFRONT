import {Component, input} from '@angular/core';
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {
  MyProgExerciseDeleteFormComponent
} from "../../../../components/form/prog-exercise/my-prog-exercise-delete-form/my-prog-exercise-delete-form.component";
import {
  MyProgExerciseEntityFormComponent
} from "../../../../components/form/prog-exercise/my-prog-exercise-entity-form/my-prog-exercise-entity-form.component";
import {
  MyProgExercisePerformanceComponent
} from "../../../../components/modal-component/prog-exercise/my-prog-exercise-performance/my-prog-exercise-performance.component";
import {ActionType} from "../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-my-prog-exercise-details-modal',
  imports: [
    ModalComponent,
    MyProgExerciseDeleteFormComponent,
    MyProgExerciseEntityFormComponent,
    MyProgExercisePerformanceComponent,
  ],
  templateUrl: './my-prog-exercise-editor-modal.component.html'
})
export class MyProgExerciseEditorModalComponent {
  readonly modalTitle = input.required<string>();
  readonly progExerciseModalId = input.required<string>();
  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly action = input.required<ActionType>();

  protected readonly ActionType = ActionType;
}
