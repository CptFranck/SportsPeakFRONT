import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {ActionType} from "../../../../../interface/enum/action-type";
import {ModalComponent} from "../../../../../components/modal/modal/modal.component";
import {
  MyProgExerciseDeleteFormComponent
} from "../../my-prog-exercise-modal-components/my-prog-exercise-delete-form/my-prog-exercise-delete-form.component";
import {
  MyProgExerciseEntityFormComponent
} from "../../../my-prog-exercises/my-prog-exercise-modal-components/my-prog-exercise-entity-form/my-prog-exercise-entity-form.component";
import {
  MyProgExercisePerformanceComponent
} from "../../../my-prog-exercises/my-prog-exercise-modal-components/my-prog-exercise-performance/my-prog-exercise-performance.component";
import {NgIf} from "@angular/common";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {ModalButtonComponent} from "../../../../../components/modal/modal-button/modal-button.component";
import {
  TargetSetDeleteFormComponent
} from "../target-set-modal-components/target-set-delete-form/target-set-delete-form.component";
import {
  TargetSetEntityFormComponent
} from "../target-set-modal-components/target-set-entity-form/target-set-entity-form.component";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {TargetSetLogsComponent} from "../target-set-logs/target-set-logs.component";
import {FormIndicator} from "../../../../../interface/utils/form-indicator";
import {
  PerformanceLogEntityFormComponent
} from "../target-set-modal-components/performance-log/performance-log-entity-form/performance-log-entity-form.component";

@Component({
  selector: 'app-target-set-modal',
  standalone: true,
  imports: [
    ModalComponent,
    MyProgExerciseDeleteFormComponent,
    MyProgExerciseEntityFormComponent,
    MyProgExercisePerformanceComponent,
    NgIf,
    ModalButtonComponent,
    TargetSetDeleteFormComponent,
    TargetSetEntityFormComponent,
    TargetSetLogsComponent,
    PerformanceLogEntityFormComponent
  ],
  templateUrl: './target-set-modal.component.html',
})
export class TargetSetModalComponent {
  @Input() modalTitle!: string;
  @Input() targetSetModalId!: string;
  @Input() targetSet: TargetSet | undefined;
  @Input() progExercise: ProgExercise | undefined;
  @Input() action!: ActionType;

  @Output() targetSetAction: EventEmitter<FormIndicator> = new EventEmitter();

  @ViewChild("targetSetModalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;

  onClick() {
    this.targetSetAction.emit({
      object: undefined,
      actionType: ActionType.create
    })
  }
}
