import {Component, input, TemplateRef, ViewChild} from '@angular/core';
import {ActionType} from "../../../../../interface/enum/action-type";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {PerformanceLog} from "../../../../../interface/dto/performance-log";
import {ModalComponent} from "../../../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
import {
  PerformanceLogEntityFormComponent
} from "../../../../../components/form/performance-log/performance-log-entity-form/performance-log-entity-form.component";
import {
  PerformanceLogsComponent
} from "../../../../../components/modal-component/performance-log/performance-logs/performance-logs.component";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";

@Component({
  selector: 'app-performance-log-modal',
  imports: [
    ModalComponent,
    NgIf,
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

  @ViewChild("performanceLogModalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
}
