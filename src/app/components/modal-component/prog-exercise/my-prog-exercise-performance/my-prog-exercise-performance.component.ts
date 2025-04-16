import {Component, computed, input, signal} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ifFirstShow, ifNotFirstCollapse} from "../../../../utils/accordion-function";
import {NgForOf} from "@angular/common";
import {PerformanceLog} from "../../../../interface/dto/performance-log";
import {DictionaryItem} from "../../../../interface/utils/dictionary-item";
import {
  PerformanceLogsSetChartComponent
} from "../../../chart/performance-logs-set-chart/performance-logs-set-chart.component";
import {RangeInputComponent} from "../../../input/range-input/range-input.component";
import {getUpToDateTargetSets, sortLastTargetSetsByIndex} from "../../../../utils/target-set-functions";
import {TargetSet} from "../../../../interface/dto/target-set";
import {TargetSetState} from "../../../../interface/enum/targetSetState";
import {sortPerformanceLogsBySet} from "../../../../utils/performance-log-functions";

@Component({
  selector: 'app-my-prog-exercise-performance',
  imports: [
    NgForOf,
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
