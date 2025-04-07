import {Component, computed, EventEmitter, input, Output, signal, TemplateRef, ViewChild} from '@angular/core';
import {TargetSet} from "../../../../interface/dto/target-set";
import {NgForOf, NgIf} from "@angular/common";
import {TargetSetLogsCardComponent} from "../../../card/target-set/target-set-logs-card/target-set-logs-card.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {getTargetSetLogs} from "../../../../utils/target-set-functions";
import {ActionType} from "../../../../interface/enum/action-type";
import {CollapseBlockComponent} from "../../../collapse-block/collapse-block.component";
import {
  TargetSetEntityFormComponent
} from "../../../form/target-set/target-set-entity-form/target-set-entity-form.component";
import {
  TargetSetDeleteFormComponent
} from "../../../form/target-set/target-set-delete-form/target-set-delete-form.component";
import {PerformanceLogsComponent} from "../../performance-log/performance-logs/performance-logs.component";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";

@Component({
  selector: 'app-target-set-logs',
  imports: [
    NgForOf,
    TargetSetLogsCardComponent,
    NgIf,
    CollapseBlockComponent,
    TargetSetEntityFormComponent,
    TargetSetDeleteFormComponent,
    PerformanceLogsComponent
  ],
  templateUrl: './target-set-logs.component.html'
})
export class TargetSetLogsComponent {
  targetSetFormCollapseId: string = "TargetSetFormCollapseId";

  readonly modalId = input.required<string>();
  readonly targetSet = input.required<TargetSet | undefined>();
  readonly progExercise = input.required<ProgExercise | undefined>();

  targetSetLogs = computed<TargetSet[]>(() => {
    const targetSet = this.targetSet();
    const progExercise = this.progExercise();
    if (targetSet && progExercise) {
      return getTargetSetLogs(targetSet, progExercise);
    }
    return [];
  });

  action = signal<ActionType>(ActionType.read);
  blocTitle = signal<string | undefined>(undefined);
  targetSetLog = signal<TargetSet | undefined>(undefined);

  @ViewChild("performanceCollapseTemplate") modalTemplate!: TemplateRef<any>;
  @Output() actionTargetSets = new EventEmitter<FormIndicator>();

  protected readonly ActionType = ActionType;

  setTargetSet(formIndicator: FormIndicator) {
    this.action.set(formIndicator.actionType);
    this.targetSetLog.set(formIndicator.object);
    if (this.action() === ActionType.checkPerformance)
      this.blocTitle.set(undefined);
    else
      this.blocTitle.set("Set created on " + new Date(formIndicator.object?.creationDate).toLocaleDateString());
  }
}
