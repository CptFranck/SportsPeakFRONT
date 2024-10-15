import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {ActionType} from "../../../../../interface/enum/action-type";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {PerformanceLog} from "../../../../../interface/dto/performance-log";
import {ModalComponent} from "../../../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
import {
  PerformanceLogDeleteFormComponent
} from "../../../../../components/form/performance-log/performance-log-delete-form/performance-log-delete-form.component";
import {
  PerformanceLogEntityFormComponent
} from "../../../../../components/form/performance-log/performance-log-entity-form/performance-log-entity-form.component";
import {
  PerformanceLogsComponent
} from "../../../../../components/modal-component/performance-log/performance-logs/performance-logs.component";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";

@Component({
  selector: 'app-performance-log-modal',
  standalone: true,
  imports: [
    ModalComponent,
    NgIf,
    PerformanceLogDeleteFormComponent,
    PerformanceLogEntityFormComponent,
    PerformanceLogsComponent
  ],
  templateUrl: './performance-log-modal.component.html',
})
export class PerformanceLogModalComponent {
  @Input() performanceLogModalId!: string;
  @Input() performanceLogModalTitle!: string;
  @Input() progExercise: ProgExercise | undefined;
  @Input() targetSet!: TargetSet | undefined;
  @Input() performanceLog!: PerformanceLog | undefined;
  @Input() action!: ActionType;

  @ViewChild("performanceLogModalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
}
