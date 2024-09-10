import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../interface/enum/action-type";
import {
  MyProgExerciseDeleteFormComponent
} from "../my-prog-exercise-modal-components/my-prog-exercise-delete-form/my-prog-exercise-delete-form.component";
import {
  MyProgExerciseDetailsDisplayComponent
} from "../../my-prog-exercises/my-prog-exercise-modal-components/my-prog-exercise-details-display/my-prog-exercise-details-display.component";
import {
  MyProgExerciseEntityFormComponent
} from "../../my-prog-exercises/my-prog-exercise-modal-components/my-prog-exercise-entity-form/my-prog-exercise-entity-form.component";
import {
  MyProgExercisePerformanceComponent
} from "../../my-prog-exercises/my-prog-exercise-modal-components/my-prog-exercise-performance/my-prog-exercise-performance.component";
import {
  PerformanceLogEntityFormComponent
} from "../my-prog-exercise-target-sets/target-set-modal-components/performance-log/performance-log-entity-form/performance-log-entity-form.component";

@Component({
  selector: 'app-my-prog-exercise-details-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    NgIf,
    MyProgExerciseDeleteFormComponent,
    MyProgExerciseDetailsDisplayComponent,
    MyProgExerciseDeleteFormComponent,
    MyProgExerciseDetailsDisplayComponent,
    MyProgExerciseEntityFormComponent,
    MyProgExercisePerformanceComponent,
    PerformanceLogEntityFormComponent
  ],
  templateUrl: './my-prog-exercise-details-modal.component.html',
})
export class MyProgExerciseDetailsModalComponent {
  @Input() modalTitle!: string;
  @Input() progExerciseModalId!: string;
  @Input() progExercise: ProgExercise | undefined;
  @Input() action!: ActionType;

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
}
