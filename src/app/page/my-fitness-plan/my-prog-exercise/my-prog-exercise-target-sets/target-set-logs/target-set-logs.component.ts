import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {NgForOf, NgIf} from "@angular/common";
import {
  TargetSetLogsCardComponent
} from "../../../../../components/card/target-set/target-set-logs-card/target-set-logs-card.component";
import {FormIndicator} from "../../../../../interface/utils/form-indicator";
import {getTargetSetLogs} from "../../../../../utils/target-set-functions";

@Component({
  selector: 'app-target-set-logs',
  standalone: true,
  imports: [
    NgForOf,
    TargetSetLogsCardComponent,
    NgIf
  ],
  templateUrl: './target-set-logs.component.html',
})
export class TargetSetLogsComponent {
  progExercise: ProgExercise | undefined;
  targetSet: TargetSet | undefined;
  targetSetLogs: TargetSet[] = [];

  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() modalId!: string;

  @Output() actionProgExercises: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  @Input() set targetSetInput(value: TargetSet | undefined) {
    this.targetSet = value;
    this.initializeTargetSetLogs();
  }

  @Input() set progExerciseInput(value: ProgExercise | undefined) {
    this.progExercise = value;
    this.initializeTargetSetLogs();
  }

  initializeTargetSetLogs() {
    if (this.targetSet && this.progExercise)
      this.targetSetLogs = getTargetSetLogs(this.targetSet, this.progExercise);
  }

  actionProgExerciseEvent(formIndicator: FormIndicator) {
    this.actionProgExercises.emit(formIndicator)
  }
}
