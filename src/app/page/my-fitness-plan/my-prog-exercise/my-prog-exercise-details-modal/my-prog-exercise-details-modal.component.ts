import {Component, input, TemplateRef, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../interface/enum/action-type";
import {
  MyProgExerciseDeleteFormComponent
} from "../../../../components/form/prog-exercise/my-prog-exercise-delete-form/my-prog-exercise-delete-form.component";
import {
  MyProgExerciseEntityFormComponent
} from "../../../../components/form/prog-exercise/my-prog-exercise-entity-form/my-prog-exercise-entity-form.component";
import {
  MyProgExercisePerformanceComponent
} from "../../../../components/modal-component/prog-exercise/my-prog-exercise-performance/my-prog-exercise-performance.component";

@Component({
  selector: 'app-my-prog-exercise-details-modal',
  imports: [
    ModalComponent,
    NgIf,
    MyProgExerciseDeleteFormComponent,
    MyProgExerciseEntityFormComponent,
    MyProgExercisePerformanceComponent,
  ],
  templateUrl: './my-prog-exercise-details-modal.component.html'
})
export class MyProgExerciseDetailsModalComponent {
  readonly modalTitle = input.required<string>();
  readonly progExerciseModalId = input.required<string>();
  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly action = input.required<ActionType>();

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
}
