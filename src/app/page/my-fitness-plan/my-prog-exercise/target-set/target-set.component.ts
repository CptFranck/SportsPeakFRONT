import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoginFormComponent} from "../../../auth/login-form/login-form.component";
import {RegisterFormComponent} from "../../../auth/register-form/register-form.component";
import {NgForOf, NgIf} from "@angular/common";
import {TargetSetCardComponent} from "../../../../components/card/target-set/target-set-card/target-set-card.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ProgExerciseTargetSets} from "../../../../interface/utils/progExerciseTargetSets";
import {Dictionary} from "../../../../interface/utils/dictionary";
import {TargetSet} from "../../../../interface/dto/target-set";

@Component({
  selector: 'app-target-sets',
  standalone: true,
  imports: [
    LoginFormComponent,
    RegisterFormComponent,
    NgForOf,
    TargetSetCardComponent,
    NgIf
  ],
  templateUrl: './target-set.component.html',
})
export class TargetSetComponent {
  isLastTargetSetUsed: Dictionary<boolean> = {};
  targetSetUsed: string = "TargetSetUsed";
  targetSetUnused: string = "TargetSetUnused";
  targetSetHidden: string = "TargetSetHidden";
  progExerciseTargetSets!: ProgExerciseTargetSets;

  @Input() targetSetModalId!: string;

  @Output() actionProgExercises: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

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
