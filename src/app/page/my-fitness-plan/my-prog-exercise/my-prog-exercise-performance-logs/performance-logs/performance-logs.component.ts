import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TargetSet} from "../../../../../interface/dto/target-set";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {PerformanceLog} from "../../../../../interface/dto/performance-log";
import {sortPerformanceLogsByDate, sortPerformanceLogsBySet} from "../../../../../utils/performance-log-functions";
import {DatePipe, JsonPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {
  PerformanceLogsCardComponent
} from "../../../../../components/card/performance-log/performance-logs-card/performance-logs-card.component";
import {FormIndicator} from "../../../../../interface/utils/form-indicator";
import {DictionaryItem} from "../../../../../interface/utils/dictionary-item";
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
import {
  PerformanceLogsChartsComponent
} from "../../../../../components/chart/performance-logs-charts/performance-logs-charts.component";
import {CollapseGroupItemComponent} from "../../../../../components/collapse-group/collapse-group-item.component";

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
    CollapseButtonComponent,
    PerformanceLogsChartsComponent,
    KeyValuePipe,
    JsonPipe,
    DatePipe,
    CollapseGroupItemComponent
  ],
  templateUrl: './performance-logs.component.html',
})
export class PerformanceLogsComponent implements OnInit {

  tabId: string = "targetLogsTab";
  tabOptions: tabOption[] = [
    {id: "performanceListId", title: "Performance list", active: "active", disabled: false},
    {id: "performanceGraphId", title: "Performances graph", active: "", disabled: false},
  ];

  action: ActionType = ActionType.read;
  formCollapseId: string = "formCollapseId";
  accordionParentId: string = "accordionParentId";

  progExercise: ProgExercise | undefined;
  targetSet: TargetSet | undefined;
  performanceLog: PerformanceLog | undefined;
  performanceLogDate: string | undefined;
  performanceLogsSortByDate: DictionaryItem<PerformanceLog[]>[] = [];
  performanceLogsSortedBySet: DictionaryItem<PerformanceLog[]>[] = [];

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
      this.performanceLogsSortedBySet = sortPerformanceLogsBySet(this.progExercise, this.targetSet);
      this.performanceLogsSortByDate = sortPerformanceLogsByDate(this.progExercise, this.targetSet)
    }
  }

  setPerformanceLog(formIndicator: FormIndicator) {
    this.action = formIndicator.actionType;
    this.performanceLog = formIndicator.object;
    this.performanceLogDate = new Date(formIndicator.object?.logDate).toLocaleDateString();
  }
}
