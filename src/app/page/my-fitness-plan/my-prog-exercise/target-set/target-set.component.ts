import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoginFormComponent} from "../../../auth/login-form/login-form.component";
import {RegisterFormComponent} from "../../../auth/register-form/register-form.component";
import {NgForOf, NgIf} from "@angular/common";
import {TargetSetCardComponent} from "../../../../components/card/target-set/target-set-card/target-set-card.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ProgExerciseTargetSets} from "../../../../interface/utils/progExerciseTargetSets";
import {Dictionary} from "../../../../interface/utils/dictionary";
import {TargetSet} from "../../../../interface/dto/target-set";
import {ActionType} from "../../../../interface/enum/action-type";
import {TargetSetLogsComponent} from "../target-set-modal-components/target-set-logs/target-set-logs.component";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {
  getProgExerciseTargetSet,
  getUpToDateTargetSets,
  sortLastTargetSetsByIndex
} from "../../../../utils/prog-exercise-functions";

@Component({
  selector: 'app-target-sets',
  standalone: true,
  imports: [
    LoginFormComponent,
    RegisterFormComponent,
    NgForOf,
    TargetSetCardComponent,
    NgIf,
    TargetSetLogsComponent
  ],
  templateUrl: './target-set.component.html',
})
export class TargetSetComponent {
  progExercise: ProgExercise | undefined;
  isLastTargetSetUsed: Dictionary<boolean> = {};
  targetSetUsedId: string = "TargetSetUsedId";
  targetSetUnusedId: string = "TargetSetUnusedId";
  targetSetHiddenId: string = "TargetSetHiddenId";

  @Input() targetSetModalId!: string;
  @Input() progExerciseTargetSets: ProgExerciseTargetSets =
    {targetSetUsed: [], targetSetUnused: [], targetSetHidden: []};

  @Output() actionProgExercises: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

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
    this.actionProgExercises.emit(event)
  }
}
