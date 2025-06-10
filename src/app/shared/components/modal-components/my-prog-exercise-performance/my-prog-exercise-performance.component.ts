import {Component, computed, input, signal} from '@angular/core';
import {ProgExercise} from "../../../model/dto/prog-exercise";
import {ifFirstShow, ifNotFirstCollapse} from "../../../../utils/accordion-function";
import {PerformanceLog} from "../../../model/dto/performance-log";
import {DictionaryItem} from "../../../model/common/dictionary-item";
import {
  PerformanceLogsSetChartComponent
} from "../../charts/performance-logs-set-chart/performance-logs-set-chart.component";
import {RangeInputComponent} from "../../inputs/range-input/range-input.component";
import {getUpToDateTargetSets, sortLastTargetSetsByIndex} from "../../../../utils/target-set-functions";
import {TargetSet} from "../../../model/dto/target-set";
import {TargetSetState} from "../../../model/enum/target-set-state";
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
        .filter((targetSets: TargetSet) => targetSets.state === TargetSetState.USED);
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
