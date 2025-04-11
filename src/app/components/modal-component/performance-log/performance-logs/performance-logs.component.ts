import {Component, computed, input, model, signal} from '@angular/core';
import {TargetSet} from "../../../../interface/dto/target-set";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {PerformanceLog} from "../../../../interface/dto/performance-log";
import {sortPerformanceLogsByDate, sortPerformanceLogsBySet} from "../../../../utils/performance-log-functions";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {DictionaryItem} from "../../../../interface/utils/dictionary-item";
import {TabOption} from "../../../../interface/components/tab/tabOption";
import {ActionType} from "../../../../interface/enum/action-type";
import {
  PerformanceLogEntityFormComponent
} from "../../../form/performance-log/performance-log-entity-form/performance-log-entity-form.component";
import {CollapseBlockComponent} from "../../../collapse-block/collapse-block.component";
import {
  PerformanceLogDeleteFormComponent
} from "../../../form/performance-log/performance-log-delete-form/performance-log-delete-form.component";
import {NgIf} from "@angular/common";
import {
  PerformanceLogSortedBySetComponent
} from "../performance-log-sorted-by-set/performance-log-sorted-by-set.component";
import {PerformanceLogsChartsComponent} from "../../../chart/performance-logs-charts/performance-logs-charts.component";
import {TabHeaderComponent} from "../../../tab-header/tab-header.component";
import {
  PerformanceLogSortedByLogDateComponent
} from "../performance-log-sorted-by-log-date/performance-log-sorted-by-log-date.component";
import {CheckBoxComponent} from "../../../input/check-box/check-box.component";

@Component({
  selector: 'app-performance-logs',
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
  templateUrl: './performance-logs.component.html'
})
export class PerformanceLogsComponent {

  readonly tabId = "targetLogsTab";
  readonly accordionParentIdSet = "accordionParentIdSet";
  readonly accordionParentIdDate = "accordionParentIdDate";
  readonly accordionParentIdGraph = "accordionParentIdGraph";
  readonly performanceLogFormCollapseId = "PerformanceLogFormCollapseId";

  readonly targetSet = input.required<TargetSet | undefined>();
  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly useRelativeInformationOnly = model<boolean>(false);

  readonly tabOptions = computed<TabOption[]>(() => {
    const targetSet = this.targetSet();
    const progExercise = this.progExercise();
    if (targetSet && progExercise)
      return [
        {id: "performanceListId" + targetSet.id, title: "Performance list", active: "active"},
        {id: "performanceGraphId" + targetSet.id, title: "Performances graph", active: ""},
      ]
    else return [];
  });

  readonly performanceLogsSortedBySet = computed<DictionaryItem<PerformanceLog[]>[]>(() => {
    const targetSet = this.targetSet();
    const progExercise = this.progExercise();
    if (targetSet && progExercise)
      return sortPerformanceLogsBySet(progExercise, targetSet, this.useRelativeInformationOnly())
    else return [];
  });

  readonly performanceLogsSortedByLogDate = computed<DictionaryItem<PerformanceLog[]>[]>(() => {
    const targetSet = this.targetSet();
    const progExercise = this.progExercise();
    if (targetSet && progExercise)
      return sortPerformanceLogsByDate(progExercise, targetSet, this.useRelativeInformationOnly())
    else return [];
  });

  switchSortByDate = signal<boolean>(true);
  action = signal<ActionType>(ActionType.read);
  performanceLog = signal<PerformanceLog | undefined>(undefined);
  performanceLogDate = signal<string | undefined>(undefined);

  protected readonly ActionType = ActionType;
  protected readonly Object: ObjectConstructor = Object;

  setPerformanceLog(formIndicator: FormIndicator) {
    this.action.set(formIndicator.actionType);
    this.performanceLog.set(formIndicator.object);
    this.performanceLogDate.set(new Date(formIndicator.object?.logDate).toLocaleDateString());
  }

  onUseRelativeInformationOnlyClick() {
    this.useRelativeInformationOnly.update(value => !value);
  }

  onCheckBoxClick() {
    this.switchSortByDate.update(value => !value);
  }
}
