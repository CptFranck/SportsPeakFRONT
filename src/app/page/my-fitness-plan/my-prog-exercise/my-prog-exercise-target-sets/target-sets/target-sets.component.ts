import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoginFormComponent} from "../../../../../components/form/auth/login-form/login-form.component";
import {RegisterFormComponent} from "../../../../../components/form/auth/register-form/register-form.component";
import {NgForOf, NgIf} from "@angular/common";
import {
  TargetSetCardComponent
} from "../../../../../components/card/target-set/target-set-card/target-set-card.component";
import {FormIndicator} from "../../../../../interface/utils/form-indicator";
import {ProgExerciseTargetSets} from "../../../../../interface/utils/progExerciseTargetSets";
import {Dictionary} from "../../../../../interface/utils/dictionary";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {ActionType} from "../../../../../interface/enum/action-type";
import {TargetSetLogsComponent} from "../target-set-logs/target-set-logs.component";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {getProgExerciseTargetSet,} from "../../../../../utils/prog-exercise-functions";
import {getUpToDateTargetSets, sortLastTargetSetsByIndex} from "../../../../../utils/target-set-functions";
import {CollapseBlockComponent} from "../../../../../components/collapse-block/collapse-block.component";
import {
  PerformanceLogsComponent
} from "../target-set-modal-components/performance-log/performance-logs/performance-logs.component";
import {TargetSetCollapsesComponent} from "../target-set-collapses/target-set-collapses.component";

@Component({
  selector: 'app-target-sets',
  standalone: true,
  imports: [
    LoginFormComponent,
    RegisterFormComponent,
    NgForOf,
    TargetSetCardComponent,
    NgIf,
    TargetSetLogsComponent,
    CollapseBlockComponent,
    PerformanceLogsComponent,
    TargetSetCollapsesComponent
  ],
  templateUrl: './target-sets.component.html',
})
export class TargetSetsComponent {
  progExercise: ProgExercise | undefined;
  isLastTargetSetUsed: Dictionary<boolean> = {};
  targetSetUsedId: string = "TargetSetUsedId";
  targetSetUnusedId: string = "TargetSetUnusedId";
  targetSetHiddenId: string = "TargetSetHiddenId";
  collapseActionType: ActionType = ActionType.checkPerformance;

  @Input() targetSetModalId!: string;
  @Input() progExerciseTargetSets: ProgExerciseTargetSets =
    {targetSetUsed: [], targetSetUnused: [], targetSetHidden: []};

  @Output() actionTargetSets: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();
  @Output() actionPerformanceLogs: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  protected readonly ActionType = ActionType;

  @Input() set progExerciseInput(progExercise: ProgExercise | undefined) {
    if (progExercise) {
      this.progExercise = progExercise;
      let targetSets: TargetSet[] = getUpToDateTargetSets(progExercise).sort(sortLastTargetSetsByIndex);
      this.progExerciseTargetSets = getProgExerciseTargetSet(targetSets);
    }
  }

  @Input() set progExerciseTargetSetsInput(progExerciseTargetSets: ProgExerciseTargetSets) {
    this.progExerciseTargetSets = progExerciseTargetSets;
    progExerciseTargetSets.targetSetUsed.forEach((targetSet: TargetSet, key: number, array: TargetSet[]) => {
      this.isLastTargetSetUsed[targetSet.id] = (array.length - 1) === key;
    })
  }

  setTargetSet(event: FormIndicator) {
    this.actionTargetSets.emit(event)
  }

  setCollapseType($event: ActionType) {
    this.collapseActionType = $event
  }

  setPerformanceLogs($event: FormIndicator) {
    this.actionPerformanceLogs.emit($event)
  }
}
