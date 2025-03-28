import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {ActionType} from "../../../../../interface/enum/action-type";
import {ModalComponent} from "../../../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {ModalButtonComponent} from "../../../../../components/modal/modal-button/modal-button.component";
import {
  TargetSetDeleteFormComponent
} from "../../../../../components/form/target-set/target-set-delete-form/target-set-delete-form.component";
import {
  TargetSetEntityFormComponent
} from "../../../../../components/form/target-set/target-set-entity-form/target-set-entity-form.component";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {
  TargetSetLogsComponent
} from "../../../../../components/modal-component/target-set/target-set-logs/target-set-logs.component";
import {FormIndicator} from "../../../../../interface/utils/form-indicator";
import {PerformanceLog} from "../../../../../interface/dto/performance-log";

@Component({
    selector: 'app-target-set-modal',
    imports: [
        ModalComponent,
        NgIf,
        ModalButtonComponent,
        TargetSetDeleteFormComponent,
        TargetSetEntityFormComponent,
        TargetSetLogsComponent,
    ],
    templateUrl: './target-set-modal.component.html'
})
export class TargetSetModalComponent {

  @Input() targetSetModalId!: string;
  @Input() targetSetModalTitle!: string;
  @Input() targetSet: TargetSet | undefined;
  @Input() progExercise: ProgExercise | undefined;
  @Input() performanceLog: PerformanceLog | undefined;
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
