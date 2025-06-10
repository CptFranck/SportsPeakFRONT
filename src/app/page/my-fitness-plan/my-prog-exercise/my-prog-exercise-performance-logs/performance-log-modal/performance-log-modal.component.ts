import {Component, input} from '@angular/core';
import {TargetSet} from "../../../../../shared/model/dto/target-set";
import {PerformanceLog} from "../../../../../shared/model/dto/performance-log";
import {ModalComponent} from "../../../../../shared/components/modal/modal.component";
import {
  PerformanceLogEntityFormComponent
} from "../../../../../shared/components/forms/performance-log/performance-log-entity-form/performance-log-entity-form.component";
import {
  PerformanceLogsComponent
} from "../../../../../shared/components/modal-components/performance-logs/performance-logs.component";
import {ProgExercise} from "../../../../../shared/model/dto/prog-exercise";
import {ActionType} from "../../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-performance-log-modal',
  imports: [
    ModalComponent,
    PerformanceLogEntityFormComponent,
    PerformanceLogsComponent
  ],
  templateUrl: './performance-log-modal.component.html'
})
export class PerformanceLogModalComponent {
  readonly performanceLogModalId = input.required<string>();
  readonly performanceLogModalTitle = input.required<string>();
  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly targetSet = input.required<TargetSet | undefined>();
  readonly performanceLog = input.required<PerformanceLog | undefined>();
  readonly action = input.required<ActionType>();

  protected readonly ActionType = ActionType;
}
