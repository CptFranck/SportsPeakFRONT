import {Component, computed, input, output} from '@angular/core';
import {FormIndicator} from "../../../../../shared/model/common/form-indicator";
import {ProgExerciseTargetSets} from "../../../../../shared/model/common/progExerciseTargetSets";
import {ProgExercise} from "../../../../../shared/model/dto/prog-exercise";
import {
  TargetSetCardComponent
} from "../../../../../components/card/target-set/target-set-card/target-set-card.component";
import {TabHeaderComponent} from "../../../../../components/tab-header/tab-header.component";
import {TabOption} from "../../../../../shared/model/component/tab/tabOption";
import {getUpToDateTargetSets, sortLastTargetSetsByIndex} from "../../../../../utils/target-set-functions";
import {getProgExerciseTargetSet} from "../../../../../utils/prog-exercise-functions";
import {Dictionary} from "../../../../../shared/model/common/dictionary";
import {TargetSet} from "../../../../../shared/model/dto/target-set";
import {ActionType} from "../../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-target-sets',
  imports: [
    TargetSetCardComponent,
    TabHeaderComponent
  ],
  templateUrl: './target-sets.component.html'
})
export class TargetSetsComponent {
  tabId: string = "targetSetTab";
  targetSetUsedId: string = "TargetSetUsedId";
  targetSetUnusedId: string = "TargetSetUnusedId";
  targetSetHiddenId: string = "TargetSetHiddenId";
  tabOptions: TabOption[] = [
    {id: this.targetSetUsedId, title: "Currently used", active: "active"},
    {id: this.targetSetUnusedId, title: "Unused", active: ""},
    {id: this.targetSetHiddenId, title: "Hidden", active: ""},
  ];

  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly targetSetModalId = input.required<string>();
  readonly performanceLogModalId = input.required<string>();

  readonly progExerciseTargetSets = computed<ProgExerciseTargetSets>(() => {
    const progExercise = this.progExercise();
    if (progExercise) {
      const targetSets = getUpToDateTargetSets(progExercise).sort(sortLastTargetSetsByIndex);
      return getProgExerciseTargetSet(targetSets);
    }
    return {targetSetUsed: [], targetSetUnused: [], targetSetHidden: []}
  });

  readonly isLastTargetSetUsed = computed<Dictionary<boolean>>(() => {
    const isLastTargetSetUsed: Dictionary<boolean> = {};
    this.progExerciseTargetSets().targetSetUsed.forEach((targetSet: TargetSet, key: number, array: TargetSet[]) => {
      isLastTargetSetUsed[targetSet.id] = (array.length - 1) === key;
    })
    return isLastTargetSetUsed;
  });

  readonly actionTargetSets = output<FormIndicator>();
  readonly actionPerformanceLogs = output<FormIndicator>();

  protected readonly ActionType = ActionType;

  setTargetSet(event: FormIndicator) {
    this.actionTargetSets.emit(event)
  }

  setPerformanceLog($event: FormIndicator) {
    this.actionPerformanceLogs.emit($event)
  }
}
