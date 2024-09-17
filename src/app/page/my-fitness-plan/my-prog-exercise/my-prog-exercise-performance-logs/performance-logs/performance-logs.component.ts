import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
import {TabHeaderComponent} from "../../../../../components/tab-header/tab-header.component";
import {tabOption} from "../../../../../interface/components/tab/tabOption";
import {CollapseBlockComponent} from "../../../../../components/collapse-block/collapse-block.component";
import {
  PerformanceLogEntityFormComponent
} from "../../../../../components/form/performance-log/performance-log-entity-form/performance-log-entity-form.component";
import {
  PerformanceLogDeleteFormComponent
} from "../../../../../components/form/performance-log/performance-log-delete-form/performance-log-delete-form.component";
import {CollapseButtonComponent} from "../../../../../components/collapse-buton/collapse-button.component";
import {ActionType} from "../../../../../interface/enum/action-type";

@Component({
  selector: 'app-performance-logs',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    PerformanceLogsCardComponent,
    TabHeaderComponent,
    CollapseBlockComponent,
    PerformanceLogEntityFormComponent,
    PerformanceLogDeleteFormComponent,
    CollapseButtonComponent
  ],
  templateUrl: './performance-logs.component.html',
})
export class PerformanceLogsComponent implements OnInit {

  tabId: string = "targetLogsTab";
  tabOptions: tabOption[] = [
    {id: "performanceListId", title: "Performance list", active: "active", disabled: false},
    {id: "performanceGraphId", title: "Performances graph", active: "", disabled: false},
  ];

  formCollapseId: string = "formCollapseId";
  action: ActionType = ActionType.read;

  targetSet: TargetSet | undefined;
  targetSetLogs: TargetSet[] = [];
  performanceLog: PerformanceLog | undefined;
  performanceLogsSortByDate: DictionaryArray<PerformanceLog[]>[] = [];
  oldPerformanceLogsSortByDate: DictionaryArray<PerformanceLog[]>[] = [];

  @Input() progExercise: ProgExercise | undefined;

  @ViewChild("performanceCollapseTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
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

  setPerformanceLog(formIndicator: FormIndicator) {
    this.action = formIndicator.actionType;
    this.performanceLog = formIndicator.object;
  }
}
