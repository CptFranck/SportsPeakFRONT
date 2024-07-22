import {Component, Input} from '@angular/core';
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {getTargetSetLogs} from "../../../../../utils/prog-exercise-functions";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-target-set-logs',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './target-set-logs.component.html',
})
export class TargetSetLogsComponent {
  progExercise: ProgExercise | undefined;
  targetSet: TargetSet | undefined;
  targetSetLogs: TargetSet[] = [];

  @Input() btnCloseRef!: HTMLButtonElement;

  @Input() set targetSetInput(value: TargetSet | undefined) {
    this.targetSet = value;
    if (this.targetSet && this.progExercise) {
      this.targetSetLogs = getTargetSetLogs(this.targetSet, this.progExercise);
    }
  }

  @Input() set progExerciseInput(value: ProgExercise | undefined) {
    this.progExercise = value;
  }
}
