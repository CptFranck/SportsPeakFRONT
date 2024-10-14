import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TargetSet} from "../../../../../interface/dto/target-set";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {PerformanceLog} from "../../../../../interface/dto/performance-log";
import {sortPerformanceLogsByDate, sortPerformanceLogsBySet} from "../../../../../utils/performance-log-functions";
import {FormIndicator} from "../../../../../interface/utils/form-indicator";
import {DictionaryItem} from "../../../../../interface/utils/dictionary-item";
import {tabOption} from "../../../../../interface/components/tab/tabOption";
import {ActionType} from "../../../../../interface/enum/action-type";
import {
  PerformanceLogEntityFormComponent
} from "../../../../../components/form/performance-log/performance-log-entity-form/performance-log-entity-form.component";
import {CollapseBlockComponent} from "../../../../../components/collapse-block/collapse-block.component";
import {
  PerformanceLogDeleteFormComponent
} from "../../../../../components/form/performance-log/performance-log-delete-form/performance-log-delete-form.component";
import {NgIf} from "@angular/common";
import {
  PerformanceLogSortedBySetComponent
} from "../performance-log-collpase-groups/performance-log-sorted-by-set/performance-log-sorted-by-set.component";
import {
  PerformanceLogsChartsComponent
} from "../../../../../components/chart/performance-logs-charts/performance-logs-charts.component";
import {TabHeaderComponent} from "../../../../../components/tab-header/tab-header.component";
import {
  PerformanceLogSortedByLogDateComponent
} from "../performance-log-collpase-groups/performance-log-sorted-by-log-date/performance-log-sorted-by-log-date.component";
import {CheckBoxComponent} from "../../../../../components/input/check-box/check-box.component";

@Component({
  selector: 'app-performance-logs',
  standalone: true,
  imports: [
    PerformanceLogEntityFormComponent,
    CollapseBlockComponent,
    PerformanceLogDeleteFormComponent,
    NgIf,
    PerformanceLogSortedBySetComponent,
    PerformanceLogsChartsComponent,
    TabHeaderComponent,
    PerformanceLogSortedByLogDateComponent,
    CheckBoxComponent
  ],
  templateUrl: './performance-logs.component.html',
})
export class PerformanceLogsComponent implements OnInit {

  tabId: string = "targetLogsTab";
  tabOptions: tabOption[] = [
    {id: "performanceListId", title: "Performance list", active: "active", disabled: false},
    {id: "performanceGraphId", title: "Performances graph", active: "", disabled: false},
  ];

  switch: boolean = true;
  action: ActionType = ActionType.read;
  accordionParentIdSet: string = "accordionParentIdSet";
  accordionParentIdDate: string = "accordionParentIdDate";
  performanceLogFormCollapseId: string = "PerformanceLogFormCollapseId";

  progExercise: ProgExercise | undefined;
  targetSet: TargetSet | undefined;
  performanceLog: PerformanceLog | undefined;
  performanceLogDate: string | undefined;
  performanceLogsSortedBySet: DictionaryItem<PerformanceLog[]>[] = [];
  performanceLogsSortedByLogDate: DictionaryItem<PerformanceLog[]>[] = [];

  @Input() isTargetSetLog: boolean = false;

  @ViewChild("performanceCollapseTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
  protected readonly Object: ObjectConstructor = Object;

  @Input() set progExerciseInput(progExercise: ProgExercise | undefined) {
    this.progExercise = progExercise;
    this.initialize();
  }

  @Input() set targetSetInput(targetSet: TargetSet | undefined) {
    this.targetSet = targetSet;
    this.initialize();
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    if (this.targetSet && this.progExercise) {
      this.performanceLogsSortedBySet = sortPerformanceLogsBySet(this.progExercise, this.targetSet, this.isTargetSetLog);
      this.performanceLogsSortedByLogDate = sortPerformanceLogsByDate(this.progExercise, this.targetSet, this.isTargetSetLog)
    }
  }

  setPerformanceLog(formIndicator: FormIndicator) {
    this.action = formIndicator.actionType;
    this.performanceLog = formIndicator.object;
    this.performanceLogDate = new Date(formIndicator.object?.logDate).toLocaleDateString();
  }

  onCheckBoxClick() {
    this.switch = !this.switch;
  }
}
