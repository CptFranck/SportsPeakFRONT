import {Component, Input} from '@angular/core';
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
export class PerformanceLogsComponent {
  progExercise: ProgExercise | undefined;
  targetSet: TargetSet | undefined;
  targetSetLogs: TargetSet[] = [];
  performanceLogs: Dictionary<PerformanceLog[]> | undefined;
  oldPerformanceLogs: Dictionary<PerformanceLog[]> = {};

  protected readonly Object: ObjectConstructor = Object;

  @Input() set progExerciseInput(value: ProgExercise | undefined) {
    this.progExercise = value;
    this.initializeTargetSetLogs();
  }

  @Input() set targetSetInput(value: TargetSet | undefined) {
    this.targetSet = value;
    this.initializeTargetSetLogs();
  }

  initializeTargetSetLogs() {
    if (this.targetSet && this.progExercise) {
      this.performanceLogs = sortPerformanceLogsByLogDate(this.targetSet);
      this.targetSetLogs = getTargetSetLogs(this.targetSet, this.progExercise);
    }
  }
}
