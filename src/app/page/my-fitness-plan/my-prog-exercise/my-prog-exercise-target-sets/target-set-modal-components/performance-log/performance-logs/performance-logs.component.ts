import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TargetSet} from "../../../../../../../interface/dto/target-set";
import {ProgExercise} from "../../../../../../../interface/dto/prog-exercise";
import {getTargetSetLogs} from "../../../../../../../utils/target-set-functions";
import {PerformanceLog} from "../../../../../../../interface/dto/performance-log";
import {Dictionary} from "../../../../../../../interface/utils/dictionary";
import {sortPerformanceLogsByLogDate} from "../../../../../../../utils/performance-log-functions";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {
  TargetSetLogsCardComponent
} from "../../../../../../../components/card/target-set/target-set-logs-card/target-set-logs-card.component";
import {
  PerformanceLogsCardComponent
} from "../../../../../../../components/card/performance-log/performance-logs-card/performance-logs-card.component";
import {FormIndicator} from "../../../../../../../interface/utils/form-indicator";

@Component({
  selector: 'app-performance-logs',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    KeyValuePipe,
    TargetSetLogsCardComponent,
    PerformanceLogsCardComponent
  ],
  templateUrl: './performance-logs.component.html',
})
export class PerformanceLogsComponent implements OnInit {

  targetSetLogs: TargetSet[] = [];
  performanceLogs: Dictionary<PerformanceLog[]> | undefined;
  oldPerformanceLogs: Dictionary<PerformanceLog[]> = {};

  @Input() modalId!: string;
  @Input() targetSet: TargetSet | undefined;
  @Input() progExercise: ProgExercise | undefined;

  @Output() actionPerformanceLog: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  protected readonly Object: ObjectConstructor = Object;

  ngOnInit() {
    if (this.targetSet && this.progExercise) {
      this.performanceLogs = sortPerformanceLogsByLogDate(this.targetSet);
      this.targetSetLogs = getTargetSetLogs(this.targetSet, this.progExercise);
    }
  }

  setPerformanceLog($event: FormIndicator) {
    this.actionPerformanceLog.emit($event)
  }
}
