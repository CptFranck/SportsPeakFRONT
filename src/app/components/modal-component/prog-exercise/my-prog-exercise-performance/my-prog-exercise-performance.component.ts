import {Component, Input} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ifFirstShow, ifNotFirstCollapse} from "../../../../utils/accordion-function";
import {DatePipe, NgForOf} from "@angular/common";
import {
  PerformanceLogsCardComponent
} from "../../../card/performance-log/performance-logs-card/performance-logs-card.component";
import {TargetSet} from "../../../../interface/dto/target-set";
import {getUpToDateTargetSets, sortLastTargetSetsByIndex} from "../../../../utils/target-set-functions";
import {TargetSetState} from "../../../../interface/enum/targetSetState";
import {sortPerformanceLogsBySet} from "../../../../utils/performance-log-functions";
import {PerformanceLog} from "../../../../interface/dto/performance-log";
import {DictionaryItem} from "../../../../interface/utils/dictionary-item";
import {
  PerformanceLogsSetChartComponent
} from "../../../chart/performance-logs-set-chart/performance-logs-set-chart.component";

@Component({
  selector: 'app-my-prog-exercise-performance',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    PerformanceLogsCardComponent,
    PerformanceLogsSetChartComponent
  ],
  templateUrl: './my-prog-exercise-performance.component.html',
})
export class MyProgExercisePerformanceComponent {
  progExercise!: ProgExercise;
  accordionAllPerformance: string = "accordionAllPerformance";
  targetSetsPerformanceLogsSortedByLogDate: DictionaryItem<DictionaryItem<PerformanceLog[]>[]>[] = []

  protected readonly ifFirstShow = ifFirstShow;
  protected readonly ifNotFirstCollapse = ifNotFirstCollapse;

  @Input() set progExerciseInput(progExercise: ProgExercise | undefined) {
    if (progExercise) {
      this.progExercise = progExercise;
      let targetSets: TargetSet[] = getUpToDateTargetSets(progExercise)
        .sort(sortLastTargetSetsByIndex)
        .filter((targetSets: TargetSet) => targetSets.state === TargetSetState.USED);
      targetSets.forEach((targetSet: TargetSet) => {
        this.targetSetsPerformanceLogsSortedByLogDate.push({
          key: targetSet.index.toString(),
          value: sortPerformanceLogsBySet(this.progExercise, targetSet)
        })
      })
      console.log(this.targetSetsPerformanceLogsSortedByLogDate)
    }
  }
}
