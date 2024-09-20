import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class TargetSetLogsComponent implements OnInit {

  targetSet: TargetSet | undefined;
  progExercise: ProgExercise | undefined;
  targetSetLogs: TargetSet[] = [];

  @Input() modalId!: string;

  @Output() actionTargetSets: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

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

  actionTargetSetEvent(formIndicator: FormIndicator) {
    this.actionTargetSets.emit(formIndicator)
  }
}
