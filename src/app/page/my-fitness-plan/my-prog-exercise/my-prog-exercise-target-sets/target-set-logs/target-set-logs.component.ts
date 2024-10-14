import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {NgForOf, NgIf} from "@angular/common";
import {
  TargetSetLogsCardComponent
} from "../../../../../components/card/target-set/target-set-logs-card/target-set-logs-card.component";
import {FormIndicator} from "../../../../../interface/utils/form-indicator";
import {getTargetSetLogs} from "../../../../../utils/target-set-functions";
import {ActionType} from "../../../../../interface/enum/action-type";
import {CollapseBlockComponent} from "../../../../../components/collapse-block/collapse-block.component";
import {
  TargetSetEntityFormComponent
} from "../../../../../components/form/target-set/target-set-entity-form/target-set-entity-form.component";
import {
  TargetSetDeleteFormComponent
} from "../../../../../components/form/target-set/target-set-delete-form/target-set-delete-form.component";

@Component({
  selector: 'app-target-set-logs',
  standalone: true,
  imports: [
    NgForOf,
    TargetSetLogsCardComponent,
    NgIf,
    CollapseBlockComponent,
    TargetSetEntityFormComponent,
    TargetSetDeleteFormComponent
  ],
  templateUrl: './target-set-logs.component.html',
})
export class TargetSetLogsComponent implements OnInit {
  switch: boolean = true;
  action: ActionType = ActionType.read;
  targetSetLog: TargetSet | undefined;
  targetSetCreationDate: string | undefined;
  targetSetFormCollapseId: string = "TargetSetFormCollapseId";

  targetSet: TargetSet | undefined;
  progExercise: ProgExercise | undefined;
  targetSetLogs: TargetSet[] = [];

  @ViewChild("performanceCollapseTemplate") modalTemplate!: TemplateRef<any>;

  @Input() modalId!: string;

  @Output() actionTargetSets: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  protected readonly ActionType = ActionType;

  @Input() set targetSetInput(targetSet: TargetSet | undefined) {
    this.targetSet = targetSet;
    this.initialize()
  }

  @Input() set progExerciseInput(progExercise: ProgExercise | undefined) {
    this.progExercise = progExercise;
    this.initialize()
  }

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    if (this.targetSet && this.progExercise)
      this.targetSetLogs = getTargetSetLogs(this.targetSet, this.progExercise);
  }

  setTargetSet(formIndicator: FormIndicator) {
    this.action = formIndicator.actionType;
    this.targetSetLog = formIndicator.object;
    this.targetSetCreationDate = new Date(formIndicator.object?.creationDate).toLocaleDateString();
  }
}
