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

  targetSetLogs: TargetSet[] = [];

  @Input() modalId!: string;
  @Input() targetSet: TargetSet | undefined;
  @Input() progExercise: ProgExercise | undefined;

  @Output() actionTargetSets: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  ngOnInit() {
    if (this.targetSet && this.progExercise)
      this.targetSetLogs = getTargetSetLogs(this.targetSet, this.progExercise);
  }

  actionTargetSetEvent(formIndicator: FormIndicator) {
    this.actionTargetSets.emit(formIndicator)
  }
}
