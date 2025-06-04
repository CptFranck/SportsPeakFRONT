import {Component, computed, input, signal} from '@angular/core';
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {ifFirstShow, ifNotFirstCollapse} from "../../../../utils/accordion-function";
import {PerformanceLog} from "../../../../shared/model/dto/performance-log";
import {DictionaryItem} from "../../../../shared/model/common/dictionary-item";
import {
  PerformanceLogsSetChartComponent
} from "../../../chart/performance-logs-set-chart/performance-logs-set-chart.component";
import {RangeInputComponent} from "../../../input/range-input/range-input.component";
import {getUpToDateTargetSets, sortLastTargetSetsByIndex} from "../../../../utils/target-set-functions";
import {TargetSet} from "../../../../shared/model/dto/target-set";
import {TargetSetStateEnum} from "../../../../shared/model/enum/targetSetState.enum";
import {sortPerformanceLogsBySet} from "../../../../utils/performance-log-functions";

@Component({
  selector: 'app-my-prog-exercise-performance',
  imports: [
    PerformanceLogsSetChartComponent,
    RangeInputComponent
  ],
  templateUrl: './my-prog-exercise-performance.component.html'
})
export class MyProgExercisePerformanceComponent {
  readonly progExercise = input.required<ProgExercise | undefined>();

  readonly targetSetsPerformanceLogsSortedByLogDate = computed<DictionaryItem<DictionaryItem<PerformanceLog[]>[]>[]>(() => {
    const progExercise = this.progExercise();
    const targetSetsPerformanceLogsSortedByLogDate: DictionaryItem<DictionaryItem<PerformanceLog[]>[]>[] = [];
    if (progExercise) {
      let targetSets: TargetSet[] = getUpToDateTargetSets(progExercise)
        .sort(sortLastTargetSetsByIndex)
        .filter((targetSets: TargetSet) => targetSets.state === TargetSetStateEnum.USED);
      targetSets.forEach((targetSet: TargetSet) => {
        targetSetsPerformanceLogsSortedByLogDate.push({
          key: targetSet.index.toString(),
          value: sortPerformanceLogsBySet(progExercise, targetSet)
        })
      })
    }
    return targetSetsPerformanceLogsSortedByLogDate;
  })

  rowColNumber = signal<number>(3);
  rowColNumberClass = computed<string>(() => "row-cols-" + this.rowColNumber());

  readonly accordionAllPerformance: string = "accordionAllPerformance";

  readonly ifFirstShow = ifFirstShow;
  readonly ifNotFirstCollapse = ifNotFirstCollapse;

  changeRowColNumber(value: number) {
    this.rowColNumber.set(value)
  }
}
