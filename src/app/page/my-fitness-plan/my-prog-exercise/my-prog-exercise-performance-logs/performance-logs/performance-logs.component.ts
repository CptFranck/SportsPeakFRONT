import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TargetSet} from "../../../../../interface/dto/target-set";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {getTargetSetLogs} from "../../../../../utils/target-set-functions";
import {PerformanceLog} from "../../../../../interface/dto/performance-log";
import {Dictionary} from "../../../../../interface/utils/dictionary";
import {
  convertDictionaryToArray,
  sortPerformanceLogsByDictionary,
  sortPerformanceLogsByLogDate
} from "../../../../../utils/performance-log-functions";
import {NgForOf, NgIf} from "@angular/common";
import {
  PerformanceLogsCardComponent
} from "../../../../../components/card/performance-log/performance-logs-card/performance-logs-card.component";
import {FormIndicator} from "../../../../../interface/utils/form-indicator";
import {DictionaryArray} from "../../../../../interface/utils/dictionary-array";

@Component({
  selector: 'app-performance-logs',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    PerformanceLogsCardComponent
  ],
  templateUrl: './performance-logs.component.html',
})
export class PerformanceLogsComponent implements OnInit {

  targetSet: TargetSet | undefined;
  targetSetLogs: TargetSet[] = [];
  performanceLogsSortByDate: DictionaryArray<PerformanceLog[]>[] = [];
  oldPerformanceLogsSortByDate: DictionaryArray<PerformanceLog[]>[] = [];

  @Input() modalId!: string;
  @Input() progExercise: ProgExercise | undefined;

  @Output() actionPerformanceLog: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  protected readonly Object: ObjectConstructor = Object;

  @Input() set targetSetInput(targetSet: TargetSet | undefined) {
    this.targetSet = targetSet;
    this.initialize();
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    if (this.targetSet && this.progExercise) {
      this.performanceLogsSortByDate = this.getPerformanceLogSortByLogDate(this.targetSet)
      this.targetSetLogs = getTargetSetLogs(this.targetSet, this.progExercise);
      this.targetSetLogs.forEach((targetSet: TargetSet) => {
        this.oldPerformanceLogsSortByDate = this.getPerformanceLogSortByLogDate(targetSet);
      });
    }
  }

  getPerformanceLogSortByLogDate(targetSet: TargetSet) {
    let performanceLogs: Dictionary<PerformanceLog[]> = sortPerformanceLogsByDictionary(targetSet);
    return convertDictionaryToArray(performanceLogs).sort(sortPerformanceLogsByLogDate);
  }

  setPerformanceLog($event: FormIndicator) {
    this.actionPerformanceLog.emit($event)
  }
}