import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {
  ProgExerciseCardDetailsComponent
} from "../../../../components/card/prog-exercise/prog-exercise-card-details/prog-exercise-card-details.component";
import {
  MyProgExerciseModalComponent
} from "../../my-prog-exercises/my-prog-exercise-modal/my-prog-exercise-modal.component";
import {
  MyProgExerciseDetailsModalComponent
} from "../my-prog-exercise-details-modal/my-prog-exercise-details-modal.component";
import {TargetSetModalComponent} from "../my-prog-exercise-target-sets/target-set-modal/target-set-modal.component";
import {TargetSet} from "../../../../interface/dto/target-set";
import {Subject, takeUntil} from "rxjs";
import {TargetSetsComponent} from "../my-prog-exercise-target-sets/target-sets/target-sets.component";
import {PerformanceLog} from "../../../../interface/dto/performance-log";
import {
  PerformanceLogModalComponent
} from "../my-prog-exercise-performance-logs/performance-log-modal/performance-log-modal.component";

@Component({
  selector: 'app-my-prog-exercise',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    LoadingComponent,
    ProgExerciseCardDetailsComponent,
    MyProgExerciseModalComponent,
    MyProgExerciseDetailsModalComponent,
    TargetSetModalComponent,
    TargetSetsComponent,
    PerformanceLogModalComponent
  ],
  templateUrl: './my-prog-exercise.component.html',
})
export class MyProgExerciseComponent implements OnInit, OnDestroy {
  loading: boolean = true;

  progExercise: ProgExercise | undefined;
  progExerciseAction: ActionType = ActionType.update;
  progExerciseModalId: string = "progExerciseModal";
  progExerciseModalTitle: string = "";

  targetSet: TargetSet | undefined;
  targetSetAction: ActionType = ActionType.update;
  targetSetModalId: string = "targetSetModalId";
  targetSetModalTitle: string = "";

  performanceLog: PerformanceLog | undefined;
  performanceLogAction: ActionType = ActionType.update;
  performanceLogModalId: string = "performanceLogModalId";
  performanceLogModalTitle: string = "";


  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly proExerciseService: ProgExerciseService = inject(ProgExerciseService);

  ngOnInit(): void {
    this.proExerciseService.progExercise
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((progExercise: ProgExercise | undefined) => {
        if (progExercise) {
          this.progExercise = progExercise;
          if (this.targetSet) {
            this.targetSet =
              this.progExercise.targetSets.find((targetSet: TargetSet) => this.targetSet?.id === targetSet.id);
          }
        }
      });
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        if (params['id'] !== this.progExercise?.id)
          this.proExerciseService.getProgExerciseById(params['id']);
      });
    this.proExerciseService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) =>
        this.loading = isLoading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setProgExercise(formIndicator: FormIndicator) {
    this.progExercise = formIndicator.object;
    this.progExerciseAction = formIndicator.actionType;
    this.progExerciseModalTitle = formIndicator.object.name;
  }

  setTargetSet(formIndicator: FormIndicator) {
    this.targetSet = formIndicator.object;
    this.targetSetAction = formIndicator.actionType;

    if (formIndicator.object === undefined)
      this.targetSetModalTitle = "Add new set's step";
    else if (formIndicator.actionType === ActionType.addEvolution)
      this.targetSetModalTitle = "Add evolution to set's step N°" + formIndicator.object.index;
    else
      this.targetSetModalTitle = "Set's step N° " + formIndicator.object.index;
  }

  setPerformanceLog(formIndicator: FormIndicator) {
    this.performanceLogAction = formIndicator.actionType;
    if (formIndicator.actionType === ActionType.create) {
      this.targetSet = formIndicator.object;
      this.performanceLog = undefined;
      this.performanceLogModalTitle = "Add new performance log";
    } else if (formIndicator.actionType === ActionType.checkPerformance) {
      this.targetSet = formIndicator.object;
      this.performanceLog = undefined;
      this.performanceLogModalTitle = "Check step N° " + this.targetSet?.index + " performances";
    } else {
      this.targetSet = undefined;
      this.performanceLog = formIndicator.object;
      this.performanceLogModalTitle = "Performance log of set N° " + formIndicator.object.setIndex +
        " the " + formIndicator.object.logDate.substring(0, 10);
    }
  }
}
